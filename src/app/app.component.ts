import { Component, OnInit } from '@angular/core';
import axios from 'axios';

interface Roadmap {
  id: number;
  technology: string;
  theme: string;
  bool: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  roadmap: Roadmap[] = [];
  newRoadmap: Roadmap = {
    id: 0,
    technology: '',
    theme: '',
    bool: false
  };
  editingId: number | null = null;
  editingRoadmap: Roadmap = {
    id: 0,
    technology: '',
    theme: '',
    bool: false
  };

  ngOnInit() {
    this.getRoadmap();
  }

  getRoadmap() {
    axios.get<Roadmap[]>('http://localhost:8000/roadmap')
      .then(response => {
        this.roadmap = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteRoadmap(id: number) {
    axios.delete(`http://localhost:8000/roadmap/${id}`)
      .then(() => {
        this.getRoadmap();
      })
      .catch(error => {
        console.error(error);
      });
  }

  createRoadmap() {
    axios.post<Roadmap>('http://localhost:8000/roadmap', this.newRoadmap)
      .then(() => {
        this.getRoadmap();
        this.newRoadmap = {
          id: 0,
          technology: '',
          theme: '',
          bool: false
        };
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateRoadmap(id: number, updatedRoadmap: Roadmap) {
    axios.put<Roadmap>(`http://localhost:8000/roadmap/${id}`, updatedRoadmap)
      .then(() => {
        this.getRoadmap();
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  editRoadmap(id: number) {
    this.editingId = id;

    const roadmap = this.roadmap.find(item => item.id === id);
    if (roadmap) {
      this.editingRoadmap = { ...roadmap };
    }
  }

  saveRoadmap() {
    this.updateRoadmap(this.editingId!, this.editingRoadmap);
    
    this.editingId = null;
    this.editingRoadmap = {
      id: 0,
      technology: '',
      theme: '',
      bool: false
    };
  }
}
