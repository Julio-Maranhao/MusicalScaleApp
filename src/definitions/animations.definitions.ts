// src/app/animations.ts
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state
} from '@angular/animations';

// 1. Fade In / Out
export const fadeInOutAnimation = trigger('fadeInOut', [
  transition(':enter', [ // void => *
    style({ opacity: 0 }),
    animate('600ms linear', style({ opacity: 1 })),
  ]),
  transition(':leave', [ // * => void
    animate('600ms linear', style({ opacity: 0 })),
  ]),
]);

// 2. Slide In / Out (Exemplo: da esquerda)
// Para outros lados, mude 'translateX(-100%)' para:
// 'translateX(100%)' (direita), 'translateY(-100%)' (cima), 'translateY(100%)' (baixo)
export const slideInOutAnimation = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }), // Começa fora da tela e invisível
    animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 })),
  ]),
]);

// Variação: Slide de baixo para cima
export const slideFromBottomAnimation = trigger('slideFromBottom', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0 }),
    animate('300ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 })),
  ]),
]);


// 3. Fade + Slide In / Out (Exemplo: slide da esquerda + fade)
export const fadeSlideInOutAnimation = trigger('fadeSlideInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(50%)' }), // Começa invisível e um pouco à esquerda
    animate('300ms linear', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
  transition(':leave', [
    animate('300ms linear', style({ opacity: 0, transform: 'translateX(50%)' })),
  ]),
]);

// Animação para listas (adicionar/remover itens com fade e slide sutil)
export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [ // Captura qualquer mudança de estado (adição/remoção)
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(-20px)' }),
      stagger('100ms', [ // Aplica um pequeno delay entre cada item entrando
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ], { optional: true }), // optional: true previne erros se não houver itens entrando
    query(':leave', [
      stagger('50ms', [ // Aplica um pequeno delay entre cada item saindo
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(20px)' }))
      ])
    ], { optional: true }) // optional: true previne erros se não houver itens saindo
  ])
]);
