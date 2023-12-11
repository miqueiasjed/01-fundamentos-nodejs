import http from 'node:http'
import {Transform} from "node:stream"


class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer(() => {
    return req
    .pipe(new InverseNumberStream())
    .pipe(res)
})

server.listen(3334)