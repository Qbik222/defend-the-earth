document.addEventListener('DOMContentLoaded', () => {
    const space = document.querySelector('.space')
    const earthContainer = document.querySelector('.earth-container');
    const earth = document.querySelector('#earth')
    const ship = document.getElementById('ship');
    const containerRect = earthContainer.getBoundingClientRect();
    let earthRadius = containerRect.width / 2;
    let score = 0;


    function updateShipPosition(angle) {
        let shipX = containerRect.left + containerRect.width / 2 + earthRadius * Math.cos(angle);
        let shipY = containerRect.top + containerRect.height / 2 + earthRadius * Math.sin(angle);

        ship.style.left = shipX - ship.clientWidth / 2 + 'px';
        ship.style.top = shipY - ship.clientHeight / 2 + 'px';
        ship.style.transform = `rotate(${angle}rad)`;
    }
    function checkCollision(elem1, elem2) {
        const elem1Rect = elem1.getBoundingClientRect();
        const elem2Rect = elem2.getBoundingClientRect();
        // console.log(elem1)
        // console.log(elem2)
        //
        // console.log(elem1Rect)
        // console.log(elem2Rect)


        return (
            elem1Rect.left < elem2Rect.right &&
            elem1Rect.right > elem2Rect.left &&
            elem1Rect.top < elem2Rect.bottom &&
            elem1Rect.bottom > elem2Rect.top

        );
    }
    function setScore(score){
        const scoreView = document.createElement('div')
        scoreView.className = 'score'
        space.appendChild(scoreView)
        scoreView.innerHTML = `<h1>your score</h1> : <span>${score}</span>`


    }
    function removeScore(){
       const scoreView = document.querySelector('.score')
        scoreView.parentNode.removeChild(scoreView)
    }
    setScore(score)
    document.addEventListener('mousemove', (e) => {
        let mouseX = e.clientX - containerRect.left;
        let mouseY = e.clientY - containerRect.top;
        ship.style.opacity = "1";

        let angle = Math.atan2(mouseY - containerRect.height / 2, mouseX - containerRect.width / 2);
        updateShipPosition(angle);
    });

    let canFire = 1
    document.addEventListener('click', (e) =>{
        const bullet = document.createElement('div');

        let mouseX = e.clientX - containerRect.left;
        let mouseY = e.clientY - containerRect.top;
        let angle = Math.atan2(mouseY - containerRect.height / 2, mouseX - containerRect.width / 2);
        updateShipPosition(angle);
        // console.log(canFire)
        // console.log(document.querySelectorAll('.bullet').length)
        if (canFire <= 1 && document.querySelectorAll('.bullet').length < 6){
            canFire++
            console.log( canFire)
            bullet.className = 'bullet';
            bullet.style.position = 'absolute';
            bullet.style.width = '40px';
            bullet.style.height = '10px';
            bullet.style.background = 'red';
            space.appendChild(bullet);
            // console.log("shot")
            bullet.style.left = ship.style.left;
            bullet.style.top = ship.style.top;
            bullet.style.transform = `rotate(${angle}rad)`;

        }

            setTimeout(() =>{
                canFire = 1
            }, 500)



        const bulletSpeed = 9;
        const bulletDX = bulletSpeed * Math.cos(angle);
        const bulletDY = bulletSpeed * Math.sin(angle);




        function moveBullet() {


            let bulletX = parseFloat(bullet.style.left);
            let bulletY = parseFloat(bullet.style.top);

            bullet.style.left = bulletX + bulletDX + 'px';
            bullet.style.top = bulletY + bulletDY + 'px';

            const movingElementsHorizontal = document.querySelectorAll('.moving-element-horizontal');
            for (const movingElement of movingElementsHorizontal) {
                if (checkCollision(bullet, movingElement)) {
                    space.removeChild(bullet);
                    movingElement.parentNode.removeChild(movingElement);
                    removeScore()
                    score++
                    setScore(score)
                    return;
                }
            }
            const movingElementsVertical = document.querySelectorAll('.moving-element-vertical');
            for (const movingElement of movingElementsVertical) {
                if (checkCollision(bullet, movingElement)) {
                    space.removeChild(bullet);
                    space.removeChild(movingElement);
                    removeScore()
                    score++
                    setScore(score)
                    return;
                }
            }


            if (
                bulletX < 0 || bulletX > window.innerWidth ||
                bulletY < 0 || bulletY > window.innerHeight
            ) {
                space.removeChild(bullet);
            } else {
                requestAnimationFrame(moveBullet);
            }
        }

        moveBullet();
    });



    function moveEnemies(movingElementHorizontal, movingElementVertical){

        movingElementHorizontal.style.animation = 'moveToCenter 5s linear';
        movingElementVertical.style.animation = 'moveToCenter 5s linear';



        function animateHorizontal() {
            if (checkCollision(movingElementHorizontal, earth)) {
                space.removeChild(movingElementHorizontal);
            }
            else {
                requestAnimationFrame(animateHorizontal);
            }
        }
        function animateVertical() {
            if (checkCollision(movingElementVertical, earth)) {
                space.removeChild(movingElementVertical);
            }
            else {
                requestAnimationFrame(animateVertical);
            }
        }

        animateHorizontal();
        animateVertical();


    }

    function spawnEnemies() {
        const movingElementHorizontal = document.createElement('div');
        const movingElementVertical = document.createElement('div');

        movingElementHorizontal.className = 'moving-element-horizontal';
        movingElementVertical.className = 'moving-element-vertical';
        space.appendChild(movingElementHorizontal);
        space.appendChild(movingElementVertical);

        const horizontalStartX = Math.random() < 0.5 ? -50 : window.innerWidth + 50; // Поза лівим або правим краєм екрану
        const horizontalStartY = Math.random() * window.innerHeight;

        const verticalStartY = Math.random() < 0.5 ? -50 : window.innerHeight + 50; // Поза лівим або правим краєм екрану
        const verticalStartX = Math.random() * window.innerWidth;


        movingElementHorizontal.style.left = horizontalStartX + 'px';
        movingElementHorizontal.style.top = horizontalStartY + 'px';
        // movingElementHorizontal.style.animation = 'moveToCenter 5s linear';

        movingElementVertical.style.left = verticalStartX + 'px';
        movingElementVertical.style.top = verticalStartY + 'px';
        // movingElementVertical.style.animation = 'moveToCenter 5s linear';

            moveEnemies(movingElementHorizontal, movingElementVertical)



    }


    setInterval(spawnEnemies, (Math.random() * 2000) + 1000);



});
