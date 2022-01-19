import Node from './Node';

export default class Card {
  card: Node<HTMLElement>;
  intensity: string;
  parameters: Node<HTMLElement>;

  constructor(parentNode: HTMLElement, title: string, imageUrl: string, duration: number, intensity: string) {
    this.intensity = intensity;
    this.card = new Node(parentNode, 'div', 'program-card z-depth-1');
    new Node(this.card.node, 'div', 'title card-title title-container', `${title}`);
    const workoutImage = new Node(this.card.node, 'div', 'image');
    workoutImage.node.style.backgroundImage = `url(${imageUrl})`;
    const cardInfo = new Node(this.card.node, 'div', 'card-info');
    const cardInfoWrapper = new Node(cardInfo.node, 'div');
    this.parameters = new Node(cardInfoWrapper.node, 'div', 'parameters');
    new Node(this.parameters.node, 'span', '', `${duration / 60} min`); //magical number!!!!
    new Node(this.parameters.node, 'span', 'separator', '|');
    new Node(this.parameters.node, 'span', 'right-space', 'Intensity');
    this.setIntensity();
  }

  setIntensity() {
    switch(this.intensity) {
      case 'low':
        // new Node(this.parameters.node, )
      case 'medium':

      case 'high':

    }
  }
}


// <div class="program-card z-depth-1">
//     <div class="title card-title title-container">HIIT 101</div>
//     <div class="image"></div>
//     <div class="card-info">
//         <div>
//             <div class="parameters">
//                 <span>10 min</span>
//                 <span class="separator">|</span>
//                 <span class="right-space">Intensity</span>
//                 <span class="middle-dot active"></span>
//                 <span class="middle-dot"></span>
//                 <span class="middle-dot"></span>
//             </div>
//             <div>
//                 <div class="circle avatar"></div>
//                 <div class="left-offset circle avatar"></div>
//                 <div class="left-offset circle avatar"></div>
//                 <div class="left-offset circle circle-text">+167</div>
//             </div>
//         </div>
//         <div>
//             <a class="waves-effect waves-light btn-large btn-completed">Completed</a>
//         </div>
//     </div>
// </div>;