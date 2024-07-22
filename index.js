document.addEventListener('DOMContentLoaded', function() {
    var draggables = document.querySelectorAll('.draggable');
    var droppables = document.querySelectorAll('.droppable');
    var status = document.getElementById('status');

    // Keyboard navigation for draggable items
    draggables.forEach(function(draggable) {
        draggable.addEventListener('keydown', function(event) {
            var currentIndex = Array.from(draggables).indexOf(draggable);

            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    if (currentIndex > 0) {
                        var previousItem = draggables[currentIndex - 1];
                        draggable.parentElement.insertBefore(draggable, previousItem);
                    }
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (currentIndex < draggables.length - 1) {
                        var nextItem = draggables[currentIndex + 1];
                        draggable.parentElement.insertBefore(nextItem, draggable);
                    }
                    break;
                case 'Enter':
                    event.preventDefault();
                    var targetList = draggable.parentElement.id === 'list1' ? document.getElementById('list2') : document.getElementById('list1');
                    targetList.appendChild(draggable);
                    status.textContent = `${draggable.textContent} moved to ${targetList.getAttribute('aria-label')}`;
                    break;
            }
        });

        // Mouse drag and drop functionality
        draggable.addEventListener('dragstart', function(event) {
            event.dataTransfer.setData('text/plain', ''); // required for Firefox to allow dragging
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', function(event) {
            draggable.classList.remove('dragging');
        });
    });

    // Droppable areas
    droppables.forEach(function(droppable) {
        droppable.addEventListener('dragover', function(event) {
            event.preventDefault();
            droppable.classList.add('dragover');
        });

        droppable.addEventListener('dragleave', function(event) {
            droppable.classList.remove('dragover');
        });

        droppable.addEventListener('drop', function(event) {
            event.preventDefault();
            var draggedItem = document.querySelector('.dragging');
            if (draggedItem) {
                droppable.appendChild(draggedItem);
                droppable.classList.remove('dragover');
                status.textContent = `${draggedItem.textContent} dropped into ${droppable.getAttribute('aria-label')}`;
            }
        });
    });

    // Set initial focus on the first draggable item
    if (draggables.length > 0) {
        draggables[0].focus();
    }
});
