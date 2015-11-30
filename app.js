document.addEventListener('DOMContentLoaded', function () {

    var story = {
        "start": {"type": 0, "text": "Hello!", "goto": "q1"},
        "q1": {"type": 1, "text": "ça va?", "answers": {"a1": {"text": "oui", "goto": "e2"}, "a2": {"text": "non", "goto": "e3"}}},
        "e2": {"type": 0, "text": "j'en suis heureux", "goto": "e4"},
        "e4": {"type": 0, "text": "arf... je suis en retard...", "goto": "e5"},
        "e5": {"type": 0, "text": "allons, entrons au campus", "goto": "e6"},
        "e6": {"type": 1, "text": "par derrière ou par devant?", "answers": {"a1": {"text": "derrière", "goto": "e7"}, "a2": {"text": "par devant", "goto": "e7"}}},
        "e3": {"type": 0, "text": "mince, il te faut un arrêt maladie", "goto": "e8"},
        "e8": {"type": 0, "text": "le plus simple serait de le faire avec toshop...", "goto": "e9"},
        "e9": {"type": 1, "text": "à moins que tu ne connaisse une medecin?", "answers": {"a1": {"text": "oui j'ai un medecin", "goto": "e10"}, "a2": {"text": "non, va pour toshop", "goto": "e11"}}},
        "e10": {"type": 0, "text": "je lui passe un coups de fil de suite!", "goto": "e12"},
        "e11": {"type": 0, "text": "faut espéré que ... soit la pour me faire ça...", "goto": "e5"},
        "e12": {"type": 0, "text": "[... est au téléphone]", "delay": 5000, "goto": "e13"},
        "e13": {"type": 0, "text": "bon... il ne répond pas... tant pis", "goto": "e5"},
        "e7": {"type": 0, "text": "bah... de toute façon il y a des agents des deux coté..."}
    }

    var current = "start";

    function play(key) {
        var div;

        current = key;

        div = document.createElement('div');
        div.innerHTML = story[current].text;
        document.body.appendChild(div);
        if (story[current].type == 1) {
            div = document.createElement('div');
            div.className += "question";
            div.innerHTML = '<div class="ans" data-ans="a1">' + story[current].answers.a1.text + '</div><div class="ans" data-ans="a2">' + story[current].answers.a2.text + '</div><div class="clear"></div>';
            div.addEventListener('click', onChoose);
            document.body.appendChild(div);
        } else {
            if (story[current].goto) {
                if (story[current].delay) {
                    setTimeout(function () {
                        wait(next);
                    }, story[current].delay);
                } else {
                    wait(next);
                }
            }
        }
    }

    function next() {
        play(story[current].goto);
    } 

    function wait(callback, delay) {

        delay = delay !== undefined ? parseInt(delay, 10) : 1500;

        div = document.createElement('div');
        div.innerHTML = '<div class="dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
        div.className = "wait";
        document.body.appendChild(div);
        setTimeout(function () {
            document.body.removeChild(div);
            callback();
        }, delay + (Math.random() * (delay * 0.5) ));        
    }

    function onChoose(e) {
        this.removeEventListener('click', onChoose);
        var ans = e.target,
            gotoKey = story[current].answers[ans.getAttribute('data-ans')].goto;

        this.innerHTML = story[current].answers[ans.getAttribute('data-ans')].text;
        
        wait(function () {
            play(gotoKey)
        });
    }

    play('start');

});
