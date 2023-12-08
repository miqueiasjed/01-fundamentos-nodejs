// Ler os dados aos poucos ou em partes e enquanto isso ja ir conseguindo processar esses dados

//Stream de entrada

import { Readable } from 'node:stream'

class OneToHundredStream extends Readable{
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

new OneToHundredStream()
.pipe(process.stdout)