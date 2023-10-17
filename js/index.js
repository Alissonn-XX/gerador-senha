const tamanhoSenha = document.querySelector('[name=quantidade]');
const btnGerarSenha = document.querySelector('[data-senha="copia"]');
const caixasDeSelecao = document.querySelectorAll('.box');
const personalizar = document.querySelector('#personalizar');
const reiniciar = document.querySelector('[data-senha="nova"]')
let listaElement = document.querySelector('ul')
let inputCheckedSelecionado = new Set();
let senha;

const objSenha = {
  0:  caracteresAleatorios = () =>{
    const caracteres = '!"#$%&()*+-./:<;=?>@[^]_{~}|´'
    .concat("'`").split('');
    const caracteresSenha = Math.floor(Math.random() * 31);
    return caracteres[caracteresSenha]
  },
  1: numerosAleatorios=()=>String.fromCharCode(Math.floor(Math.random() * 10) + 48),
  2: letraMaiusculaAleatorias=()=>String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  3: LetrasMinusculaAleatorias=()=>String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

tamanhoSenha.onchange = () =>{
    const quantidadeCaracteres = tamanhoSenha.previousElementSibling;
    const valueInput = tamanhoSenha.value;
    if(valueInput <= 12){
      tamanhoSenha.classList.add('movendo-input')
      quantidadeCaracteres.style.opacity = '1'
      quantidadeCaracteres.innerText = valueInput
    }
    senha = valueInput
}

personalizar.onclick = () =>{
  listaElement.classList.remove('ativando-pesonalização')
  if(personalizar.checked){
    listaElement.classList.add('ativando-pesonalização')
  }
}

const personalizarSenha = (ativar=false, ...inputEntrada) =>{
  let unindoSenha = [];
  let unindoSenhaPersonalizada = [];
     if(ativar && inputEntrada.length > 0){
       for(let entrada of inputEntrada){
         let str = entrada.toString()
            if(Object.keys(objSenha).includes(str)){
              unindoSenhaPersonalizada.push(objSenha[str])
              }
            } 
          return unindoSenhaPersonalizada;
        }
      unindoSenha.push(...Object.values(objSenha));
      return unindoSenha
}

caixasDeSelecao.forEach((checkbox)=>{
  checkbox.addEventListener('click',event =>{
    if(event.target.checked){
      inputCheckedSelecionado.add(event.target.name)
    }
  })
})

const senhaComprimento = (senha=6) =>{
   let novaSenha = '';
   let total = senha;
   const unindoSenha = [...personalizarSenha(personalizar.checked,...inputCheckedSelecionado)];
   for(i = 0; i < total; i++){
        let resultadoSenha = unindoSenha[Math.floor(Math.random() * unindoSenha.length)]()      
        novaSenha += resultadoSenha
    }  
    return novaSenha
}

const imgCopiar = document.querySelector('#copiar')

btnGerarSenha.addEventListener('click', ()=>{
  let labelSenha = document.querySelector('.senha label')
  labelSenha.innerText = senhaComprimento(senha)
  imgCopiar.style.visibility="visible";
});

const copiandoTexto = () =>{
  let labelSenha = document.querySelector('.senha label')
  let textCopy = document.createElement('span')
  if(labelSenha.innerText.toLowerCase() !== 'senha aqui'){  
    copiando(labelSenha.innerText)
  }

  async function copiando(texto){
    try{
      await navigator.clipboard.writeText(texto)
      textCopiado(textCopy)
    }catch(error){
     console.log(error);
    }
  }
}

const textCopiado  = (elemento)=>{
  elemento.innerText = 'senha copiada !'
  imgCopiar.insertAdjacentElement('afterend',elemento)
  
  
  setTimeout(()=>{
    if(elemento){
      elemento.remove()
    }
  },1000)
}

imgCopiar.addEventListener('click', copiandoTexto)


reiniciar.addEventListener('click', ()=>{
   location.reload()
})

console.log(imgCopiar);
