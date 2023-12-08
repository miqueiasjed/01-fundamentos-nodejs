// Ler os dados aos poucos ou em partes e enquanto isso ja ir conseguindo processar esses dados

//Stream de entrada

// o transform fica entre a leitura e a escrita pq ele precisar ler algo transformar e depois escrever

import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read(){
        const i = this.index++

        setTimeout(() => {
            if(i > 100){
                this.push(null)
            }else{
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    //chunk é a leitura parcial do que enviamos acima no read e ele tem que ser convertido em string
    // porque seu formato atual é buffer
    //callback é a resposta que a função vai nos retornar
    _write(chunk, enconding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}


new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream())