import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers = [];

  onAddServer() {
    this.servers.push('Another Server');
  }

  onRemoveServer(id: number) {
    if (id === this.servers.length - 1) {
      this.servers.splice(id, 1);
    } else {
      this.servers.splice(id + 1, 1);
    }
    // let position = id + 1;
  }
}
