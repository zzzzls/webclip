import * as http from "http";
import { URL } from "url";
import { sqlite } from "./mySqlite.mjs";

let server_config = {
    'host': '0.0.0.0',
    'port': 80
}

let router_pattern = {
    "/get": { 'methods': ['get'], 'view': webclip },
    "/set": { 'methods': ['post'], 'view': webclip_set },
    // "/favicon.ico": {'method': [], 'view': bad_req}
}

let cursor = new sqlite();

var server = http.createServer((req, res) => {
    let url_params = new URL(req.url, `http://${req.headers.host}`)
    let req_method = req.method.toLowerCase()
    let req_url = url_params.pathname

    console.log(`${url_params.hostname} - - "${req.method} ${req_url}${url_params.search}"`);

    if (req_url in router_pattern) {
        let router_rule = router_pattern[req_url]
        let expected_methods = router_rule['methods']
        if (expected_methods.includes(req_method)) {
            return router_rule['view'](req.method, url_params.searchParams, get_form(req), res)
        }
    }

    return bad_req(req.method, url_params.searchParams, get_form(req), res);
}).listen(server_config['port'], server_config['host'], () => {
    console.log(` * Running on http://${server_config['host']}:${server_config['port']}/ (Press CTRL+C to quit)`)
})

// post 请求参数
function get_form(req) {
    return new Promise((resolve, reject) => {
        let form = '';
        req.on('data', (chunk) => {
            form += chunk;
        })
        req.on('end', () => {
            try {
                form = JSON.parse(form)
            } catch (error) {
                form = {}
            } finally {
                resolve(form)
            }
        })
    })
}

function make_response(res, response) {
    res.writeHead(response['status'], response['headers'])
    res.end(JSON.stringify(response['data']))
}

function webclip(method, args, form, res) {
    let response = {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        data: { "content": "", "msg": "success" }
    }

    let user = args.get('user');
    cursor.query(user, (row) => {
        if (row) {
            response['data']['content'] = row['content']
        } else {
            response['status'] = 404
            response['data']['msg'] = "User not Found!"
            response['data']['content'] = ''
        }
        make_response(res, response)
    })
}

function webclip_set(method, args, form, res) {
    form.then((form) => {
        let response = {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
            data: { 'msg': 'success' }
        }

        cursor.insert_and_update(form['user'], form['content']);
        make_response(res, response)
    })
}

function bad_req(method, args, form, res) {
    let response = {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
        data: { "msg": "fail" }
    }
    make_response(res, response)
}

