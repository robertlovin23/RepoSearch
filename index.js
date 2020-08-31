const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./config/keys')
const mcache = require('memory-cache');
const { Octokit } = require("@octokit/rest");

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));

let cache = (duration) => {
    return(req,res,next) => {
        let key = '__express__' + req.originalUrl || req.url;
        let cachedBody = mcache.get(key);
        if(cachedBody){
            res.send(cachedBody);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
        } next();
    }
}

const octokit = new Octokit({
    auth: keys.githubKey,
    baseUrl: 'https://api.github.com',
});

app.get(`/github/results/:query/:language`, cache(10), async (req,res) => {
    const language = req.params.language;
    const queryString =req.params.query;

    const queryS = queryString + '+language:' + language;

    const query = await octokit.search.repos({
        q: queryS,
        sort: 'stars',
        order: 'desc'
    })

    console.log(query)
    res.send(query.data.items)
})

app.get('/github/repository/:owner/:repo', cache(10), async (req,res) => {
    console.log(req.params)

    const owner = req.params.owner;
    const repoName = req.params.repo;

    const repo = await octokit.repos.get({
        owner: owner,
        repo: repoName
    })

    res.send(repo.data)
})

if(process.env.NODE_ENV === 'production'){
    // Express will serve up production assets
    // like our main.js or main.css
    app.use(express.static('client/build'));
    // Express will serve up index.html file
    // if it doesn't recognizes the route
    const path = require('path');

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port);