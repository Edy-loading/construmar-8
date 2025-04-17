const faixa = document.querySelector('.faixa');
const setaDireita = document.getElementById('seta-direita');
const setaEsquerda = document.getElementById('seta-esquerda');

let animando = true;

// Movimento automático
function rolarAuto() {
  if (animando) {
    faixa.scrollLeft += 1;
    if (faixa.scrollLeft >= faixa.scrollWidth - faixa.clientWidth) {
      faixa.scrollLeft = 0;
    }
  }
  requestAnimationFrame(rolarAuto);
}
rolarAuto();

// Pausar rolagem ao passar o mouse
faixa.addEventListener('mouseenter', () => animando = false);
faixa.addEventListener('mouseleave', () => animando = true);

// Variáveis para controlar clique x arraste
let intervalo;
let isDragging = false;

// Função para iniciar e parar rolagem contínua
function iniciarRolagem(direcao, e) {
  e.preventDefault();
  isDragging = false;
  intervalo = setInterval(() => {
    faixa.scrollLeft += direcao;
  }, 10);
}

function pararRolagem() {
  clearInterval(intervalo);
}

// Eventos para seta direita
setaDireita.addEventListener('mousedown', (e) => iniciarRolagem(10, e));
setaDireita.addEventListener('mousemove', () => isDragging = true);
setaDireita.addEventListener('mouseup', () => {
  pararRolagem();
  if (!isDragging) faixa.scrollBy({ left: 200, behavior: 'smooth' });
});
setaDireita.addEventListener('mouseleave', pararRolagem);

setaDireita.addEventListener('touchstart', (e) => iniciarRolagem(10, e), { passive: false });
setaDireita.addEventListener('touchmove', () => isDragging = true);
setaDireita.addEventListener('touchend', () => {
  pararRolagem();
  if (!isDragging) faixa.scrollBy({ left: 200, behavior: 'smooth' });
});

// Eventos para seta esquerda
setaEsquerda.addEventListener('mousedown', (e) => iniciarRolagem(-10, e));
setaEsquerda.addEventListener('mousemove', () => isDragging = true);
setaEsquerda.addEventListener('mouseup', () => {
  pararRolagem();
  if (!isDragging) faixa.scrollBy({ left: -200, behavior: 'smooth' });
});
setaEsquerda.addEventListener('mouseleave', pararRolagem);

setaEsquerda.addEventListener('touchstart', (e) => iniciarRolagem(-10, e), { passive: false });
setaEsquerda.addEventListener('touchmove', () => isDragging = true);
setaEsquerda.addEventListener('touchend', () => {
  pararRolagem();
  if (!isDragging) faixa.scrollBy({ left: -200, behavior: 'smooth' });
});

// Clique na imagem para destaque
const imgs = document.querySelectorAll(".faixa img");
const destaque = document.getElementById("destaque");
const imgDestaque = document.getElementById("img-destaque");

imgs.forEach(img => {
  img.addEventListener("click", () => {
    imgDestaque.src = img.src;
    destaque.classList.remove("hidden");
    animando = false; // Pausa rolagem enquanto o destaque está aberto
  });
});

// Fechar destaque
function fecharDestaque() {
  destaque.classList.add("hidden");
  imgDestaque.src = "";
  animando = true;
}

// Popup da seção "projetos realizados"
document.addEventListener("DOMContentLoaded", function () {
  const imagens = document.querySelectorAll('.projetos_realizados_photoarea img');
  const popup = document.getElementById('imagem-popup');
  const popupImg = popup.querySelector('.imagem-popup-conteudo');
  const fecharBtn = popup.querySelector('.fechar-popup');

  imagens.forEach(img => {
    img.addEventListener('click', function () {
      popupImg.src = this.src;
      popup.style.display = 'flex';
    });
  });

  fecharBtn.addEventListener('click', function () {
    popup.style.display = 'none';
  });

  popup.addEventListener('click', function (e) {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });
});





// Seleção de elementos
const btnMenu = document.getElementById('btnMenu');
const menuMobile = document.getElementById('menuMobile');
const menuLinks = menuMobile.querySelectorAll('a');

// Abre ou fecha o menu ao clicar no botão (hamburguer)
btnMenu.addEventListener('click', () => {
    if (menuMobile.style.display === 'block') {
        menuMobile.style.display = 'none';
    } else {
        menuMobile.style.display = 'block';
    }
});

// Fechar o menu quando um link for clicado (sem interferir na rolagem)
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Previne o comportamento padrão do link
        const targetSection = document.querySelector(link.getAttribute('href')); // Obtém a seção de destino
        
        // Rola suavemente até a seção clicada
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Não escondemos o menu ao clicar
        // Se você deseja esconder o menu após clicar no link, use a linha abaixo:
        // menuMobile.style.display = 'none';
    });
});

// Garantir que o menu esteja sempre visível no topo da página
window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        // Quando rolar para o topo, o menu será mantido visível
        menuMobile.style.display = 'block';
    }
});

// Garantir que o menu esteja visível ao carregar a página
window.addEventListener('load', () => {
    menuMobile.style.display = 'block';
});
