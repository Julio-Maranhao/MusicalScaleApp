import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css'
})
export class ContextMenuComponent {
  menuItems = [
    { label: 'Option 1', action: () => console.log('Option 1 clicked') },
    { label: 'Option 2', action: () => console.log('Option 2 clicked') },
  ];

  onContextMenu(event: MouseEvent) {
      event.preventDefault();
      const contextMenu = document.getElementById('contextMenu');
      if (contextMenu) {
          contextMenu.style.left = event.clientX + 'px';
          contextMenu.style.top = event.clientY + 'px';
          contextMenu.style.display = 'block';
      }
  }

  onMenuItemClick(item: { label: string; action: () => void }) {
    item.action();
    this.hideContextMenu();
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.hideContextMenu();
  }

  hideContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    if (contextMenu) {
          contextMenu.style.display = 'none';
    }
  }
}
