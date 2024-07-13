function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, array = Array(arr.length); i < arr.length; i++) {
            array[i] = arr[i];
        }
        return array;
    }
    return Array.from(arr);
}

var playing = true;

var timer = function() {
    return setInterval(function() {
        var counter = document.getElementById("counter"),
            count = parseInt(counter.innerText);
        counter.innerText = count + 1;
    }, 1000);
};

var interval = timer(),
    minus = document.getElementById("minus"),
    plus = document.getElementById("plus"),
    heart = document.getElementById("heart"),
    pause = document.getElementById("pause"),
    commentForm = document.getElementsByTagName("form")[0];

minus.addEventListener("click", function() {
    var counter = document.getElementById("counter"),
        count = parseInt(counter.innerText);
    counter.innerText = count - 1;
});

plus.addEventListener("click", function() {
    var counter = document.getElementById("counter"),
        count = parseInt(counter.innerText);
    counter.innerText = count + 1;
});

heart.addEventListener("click", function() {
    var counter = document.getElementById("counter"),
        count = parseInt(counter.innerText),
        likesList = document.querySelector(".likes"),
        existingLikeItem;

    var childrenArray = [].concat(_toConsumableArray(likesList.children));
    existingLikeItem = childrenArray.find(function(item) {
        return parseInt(item.dataset.num) === count;
    });

    if (existingLikeItem) {
        var likeCount = parseInt(existingLikeItem.children[0].innerText);
        existingLikeItem.innerHTML = `${count} has been liked <span>${likeCount + 1}</span> times`;
    } else {
        var newLikeItem = document.createElement("li");
        newLikeItem.setAttribute("data-num", count);
        newLikeItem.innerHTML = `${count} has been liked <span>1</span> time`;
        likesList.appendChild(newLikeItem);
    }
});

pause.addEventListener("click", function() {
    if (playing) {
        playing = false;
        clearInterval(interval);
        this.innerText = "resume";
    } else {
        playing = true;
        interval = timer();
        this.innerText = "pause";
    }
    var buttons = [].concat(_toConsumableArray(document.getElementsByTagName("button")));
    buttons.forEach(function(button) {
        if (button.id !== "pause") {
            button.disabled = !playing;
        }
    });
});

commentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var commentInput = this.children[0],
        commentText = commentInput.value;
    commentInput.value = "";
    var commentsList = document.querySelector(".comments"),
        newComment = document.createElement("p");
    newComment.innerText = commentText;
    commentsList.appendChild(newComment);
});
