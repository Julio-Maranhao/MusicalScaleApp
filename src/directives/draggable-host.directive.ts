import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggableHost]',
  standalone: true
})
export class DraggableHostDirective implements OnInit {
  private isPressed = false;  // O mouse/dedo está pressionado no elemento
  private isDragging = false; // O elemento está efetivamente sendo arrastado

  // Posição inicial do ponteiro (mouse/toque) quando o arraste começa
  private pointerStartX = 0;
  private pointerStartY = 0;

  // Valores de translação (translateX, translateY) do elemento no início do arraste
  private elementStartTranslateX = 0;
  private elementStartTranslateY = 0;

  // Valores atuais de translação (translateX, translateY)
  private currentX = 0;
  private currentY = 0;

  private nativeElement: HTMLElement;
  private readonly DRAG_THRESHOLD = 5; // pixels. Movimento mínimo para considerar arraste no touch

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.nativeElement = this.el.nativeElement as HTMLElement;
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.nativeElement, 'touch-action', 'none'); // Essencial para touch
    this.renderer.setStyle(this.nativeElement, 'user-select', 'none');  // Previne seleção de texto

    // // Lê a transformação CSS inicial, se houver.
    // // currentX e currentY representam apenas a translação aplicada pela diretiva.
    // // A posição CSS original (left, top, static flow) atua como a base.
    // const computedStyle = window.getComputedStyle(this.nativeElement);
    // const transform = computedStyle.transform;

    // if (transform && transform !== 'none') {
    //   try {
    //     // Tenta extrair translateX (m41 ou e) e translateY (m42 ou f)
    //     const matrix = new (window.WebKitCSSMatrix || window.DOMMatrix)(transform);
    //     this.currentX = matrix.m41 || matrix.e;
    //     this.currentY = matrix.m42 || matrix.f;
    //   } catch (e) {
    //     console.warn('DraggableHostDirective: Could not parse initial transform. Assuming (0,0).', e);
    //     this.currentX = 0;
    //     this.currentY = 0;
    //   }
    // } else {
    //   this.currentX = 0;
    //   this.currentY = 0;
    // }
    // this.updateTransform(); // Aplica a transformação inicial (pode ser 0,0)
  }

  private getPointerPosition(event: MouseEvent | TouchEvent): { x: number; y: number } | null {
    if (event instanceof TouchEvent) {
      if (event.touches.length > 0) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }
      return null; // Nenhum toque ativo
    }
    // MouseEvent
    return { x: event.clientX, y: event.clientY };
  }

  // --- Lógica de "Pressionar" (Início do Contato) ---
  private handlePressDown(event: MouseEvent | TouchEvent): void {
    const pointerPos = this.getPointerPosition(event);
    if (!pointerPos) return;

    // Para touch, não começar arraste se já houver outro dedo na tela (simplificação)
    if (event instanceof TouchEvent && event.touches.length > 1) {
        return;
    }

    this.isPressed = true;
    // Não definimos isDragging ainda, especialmente para touch

    this.pointerStartX = pointerPos.x;
    this.pointerStartY = pointerPos.y;

    this.elementStartTranslateX = this.currentX;
    this.elementStartTranslateY = this.currentY;

    // Para mouse, podemos prevenir a seleção de texto imediatamente se quisermos.
    // Para touch, NÃO chamamos preventDefault() aqui para permitir cliques.
    if (event instanceof MouseEvent) {
      // event.preventDefault(); // Opcional: pode ajudar a evitar seleção de texto com mouse
    }
  }

  // --- Lógica de "Movimento" ---
  private handlePointerMove(event: MouseEvent | TouchEvent): void {
    if (!this.isPressed) {
      return;
    }

    const pointerPos = this.getPointerPosition(event);
    if (!pointerPos) return;

    const deltaX = pointerPos.x - this.pointerStartX;
    const deltaY = pointerPos.y - this.pointerStartY;

    if (!this.isDragging) {
      // Se ainda não estamos arrastando, verifica se o limiar foi atingido (para touch)
      // Para mouse, qualquer movimento após o 'mousedown' é considerado arraste.
      if (event instanceof MouseEvent ||
          (Math.abs(deltaX) > this.DRAG_THRESHOLD || Math.abs(deltaY) > this.DRAG_THRESHOLD)) {
        this.isDragging = true;
        this.renderer.setStyle(this.nativeElement, 'cursor', 'grabbing');
      }
    }

    if (this.isDragging) {
      // IMPORTANTE: Prevenir o comportamento padrão (scroll/zoom) AGORA que sabemos que é um arraste.
      event.preventDefault();

      this.currentX = this.elementStartTranslateX + deltaX;
      this.currentY = this.elementStartTranslateY + deltaY;
      this.updateTransform();
    }
  }

  // --- Lógica de "Soltar" (Fim do Contato) ---
  private handlePressUp(): void {
    if (this.isDragging) {
      this.renderer.setStyle(this.nativeElement, 'cursor', 'auto');
    }
    this.isPressed = false;
    this.isDragging = false;
  }

  private updateTransform(): void {
    this.renderer.setStyle(
      this.nativeElement,
      'transform',
      `translate(${this.currentX}px, ${this.currentY}px)`
    );
  }

  // --- Event Listeners ---

  // MOUSE (no próprio host)
  @HostListener('mousedown', ['$event'])
  onHostMouseDown(event: MouseEvent): void {
    if (event.button === 0) { // Apenas botão esquerdo
      this.handlePressDown(event);
    }
  }

  // TOUCH (no próprio host)
  @HostListener('touchstart', ['$event'])
  onHostTouchStart(event: TouchEvent): void {
    this.handlePressDown(event);
  }

  // DOCUMENT: MOUSEMOVE
  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent): void {
    this.handlePointerMove(event);
  }

  // DOCUMENT: TOUCHMOVE
  @HostListener('document:touchmove', ['$event'])
  onDocumentTouchMove(event: TouchEvent): void {
    // Passar { passive: false } se o preventDefault dentro de handlePointerMove
    // gerar avisos no console sobre listener passivo.
    // No Angular, @HostListener não tem uma forma direta de passar options.
    // Se isso for um problema, o listener precisaria ser adicionado programaticamente
    // no ngOnInit com renderer2.listen e options { passive: false }.
    // Por ora, a maioria dos navegadores modernos é inteligente sobre isso.
    this.handlePointerMove(event);
  }

  // DOCUMENT: MOUSEUP
  @HostListener('document:mouseup')
  onDocumentMouseUp(): void {
    this.handlePressUp();
  }

  // DOCUMENT: TOUCHEND / TOUCHCANCEL
  @HostListener('document:touchend')
  @HostListener('document:touchcancel')
  onDocumentTouchEnd(): void {
    this.handlePressUp();
  }

  public moveToViewportCenter(): void {
    if (!this.nativeElement) return;

    const elemWidth = this.nativeElement.offsetWidth;
    const elemHeight = this.nativeElement.offsetHeight;

    // Calcula a posição X,Y do canto superior esquerdo do elemento para que seu *centro*
    // alinhe com o centro do viewport.
    const targetX = - elemWidth/2;
    const targetY = - elemHeight/2;

    // A variável this.currentX/Y representa o valor total do 'transform: translate()'.
    // Se o elemento tem uma posição base CSS (ex: left: 100px) e o transform é aplicado
    // sobre isso, este método de centralização no viewport pode não resultar no centro visual
    // a menos que a posição base CSS seja (0,0) em relação ao viewport.
    // Para o caso mais simples (e.g., position:fixed; left:0; top:0;), podemos setar diretamente:
    this.currentX = targetX;
    this.currentY = targetY;

    this.updateTransform();
    this.cleanupDragState();
  }

  private cleanupDragState(): void {
    if (this.isDragging || this.isPressed) {
      this.renderer.setStyle(this.nativeElement, 'cursor', 'auto');
      this.isPressed = false;
      this.isDragging = false;
    }
  }
}
