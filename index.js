// Import stylesheets
import './style.css';

var draggables = [
  { name: 'Red', offset: {}, clicked: false },
  { name: 'Green', offset: {}, clicked: false },
  { name: 'Yellow', offset: {}, clicked: false },
];

$(document).ready(function () {
  init();

  $('.draggable').draggable({
    containment: 'parent',
    stop: function () {
      let dragIndex = draggables.findIndex((x) => x.name == $(this).text());

      let offset = $(this).offset();
      draggables[dragIndex].offset = {
        top: offset.top,
        left: offset.left,
      };
      draggables[dragIndex].clicked = true;
    },
  });

  $('.draggable').on('click', function () {
    let dragIndex = draggables.findIndex((x) => x.name == $(this).text());
    draggables[dragIndex].clicked = true;
  });

  $('#btnSubmit').click(function () {
    submit();
  });
});

function init() {
  for (let i = 0; i < draggables.length; i++) {
    let drag = draggables[i];
    let name = drag.name.toLowerCase();

    let elem = $(
      `<div id="draggable-${name}" class="draggable ui-widget-content bg-${name}">${drag.name}</div>`
    );
    elem.appendTo('#draggable-area');

    let offset = elem.offset();
    draggables[i].offset = {
      top: roundToDecimalPlaces(offset.top),
      left: roundToDecimalPlaces(offset.left),
    };
  }
}

function submit() {
  $('#info').html('');

  let clickedDraggables = draggables.filter((x) => x.clicked);

  for (let drag of clickedDraggables) {
    let name = drag.name;
    let offset = drag.offset;

    let elem = $(
      `<div class="pb-3">
        <div>Name: ${name}</div> 
        <div>Current (Offset) Position: 
          <span>Top: ${roundToDecimalPlaces(offset.top)} px</span>
          <span>Left: ${roundToDecimalPlaces(offset.left)} px</span>
        </div>
      </div>`
    );
    elem.appendTo('#info');
  }

  // Reset draggables to clicked: false
  draggables = draggables.map((x) => {
    x.clicked = false;

    return x;
  });
}

function roundToDecimalPlaces(value, dp = 0) {
  let pow = Math.pow(10, dp);
  return (Math.round(value * pow) / pow).toFixed(dp);
}
