"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
document.addEventListener('DOMContentLoaded', function () {
  var space = document.querySelector('.space');
  var earthContainer = document.querySelector('.earth-container');
  var earth = document.querySelector('#earth');
  var ship = document.getElementById('ship');
  var containerRect = earthContainer.getBoundingClientRect();
  var earthRadius = containerRect.width / 2;
  var score = 0;
  console.log(containerRect);
  function updateShipPosition(angle) {
    var shipX = containerRect.left + containerRect.width / 2 + earthRadius * Math.cos(angle);
    var shipY = containerRect.top + containerRect.height / 2 + earthRadius * Math.sin(angle);
    ship.style.left = shipX - ship.clientWidth / 2 + 'px';
    ship.style.top = shipY - ship.clientHeight / 2 + 'px';
    ship.style.transform = "rotate(".concat(angle, "rad)");
  }
  function checkCollision(bullet, movingElement) {
    var bulletRect = bullet.getBoundingClientRect();
    var movingElementRect = movingElement.getBoundingClientRect();
    console.log("gameover");
    return bulletRect.left < movingElementRect.right && bulletRect.right > movingElementRect.left && bulletRect.top < movingElementRect.bottom && bulletRect.bottom > movingElementRect.top;
  }
  function setScore(score) {
    var scoreView = document.createElement('div');
    scoreView.className = 'score';
    space.appendChild(scoreView);
    scoreView.innerHTML = "<h1>your score</h1> : <span>".concat(score, "</span>");
  }
  function removeScore() {
    var scoreView = document.querySelector('.score');
    scoreView.parentNode.removeChild(scoreView);
  }
  setScore(score);
  document.addEventListener('mousemove', function (e) {
    var mouseX = e.clientX - containerRect.left;
    var mouseY = e.clientY - containerRect.top;
    ship.style.opacity = "1";
    var angle = Math.atan2(mouseY - containerRect.height / 2, mouseX - containerRect.width / 2);
    updateShipPosition(angle);
  });
  var canFire = 1;
  document.addEventListener('click', function (e) {
    var bullet = document.createElement('div');
    var mouseX = e.clientX - containerRect.left;
    var mouseY = e.clientY - containerRect.top;
    var angle = Math.atan2(mouseY - containerRect.height / 2, mouseX - containerRect.width / 2);
    updateShipPosition(angle);
    // console.log(canFire)
    // console.log(document.querySelectorAll('.bullet').length)
    if (canFire <= 1 && document.querySelectorAll('.bullet').length < 6) {
      canFire++;
      console.log(canFire);
      bullet.className = 'bullet';
      bullet.style.position = 'absolute';
      bullet.style.width = '40px';
      bullet.style.height = '10px';
      bullet.style.background = 'red';
      space.appendChild(bullet);
      // console.log("shot")
      bullet.style.left = ship.style.left;
      bullet.style.top = ship.style.top;
      bullet.style.transform = "rotate(".concat(angle, "rad)");
    }
    setTimeout(function () {
      canFire = 1;
    }, 500);
    var bulletSpeed = 9;
    var bulletDX = bulletSpeed * Math.cos(angle);
    var bulletDY = bulletSpeed * Math.sin(angle);
    function moveBullet() {
      var bulletX = parseFloat(bullet.style.left);
      var bulletY = parseFloat(bullet.style.top);
      bullet.style.left = bulletX + bulletDX + 'px';
      bullet.style.top = bulletY + bulletDY + 'px';
      var movingElementsHorizontal = document.querySelectorAll('.moving-element-horizontal');
      var _iterator = _createForOfIteratorHelper(movingElementsHorizontal),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var movingElement = _step.value;
          if (checkCollision(bullet, movingElement)) {
            space.removeChild(bullet);
            movingElement.parentNode.removeChild(movingElement);
            removeScore();
            score++;
            setScore(score);
            return; // Виходимо з циклу, бо вже видалили елемент
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var movingElementsVertical = document.querySelectorAll('.moving-element-vertical');
      var _iterator2 = _createForOfIteratorHelper(movingElementsVertical),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _movingElement = _step2.value;
          if (checkCollision(bullet, _movingElement)) {
            space.removeChild(bullet);
            document.body.removeChild(_movingElement);
            removeScore();
            score++;
            setScore(score);
            return; // Виходимо з циклу, бо вже видалили елемент
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (bulletX < 0 || bulletX > window.innerWidth || bulletY < 0 || bulletY > window.innerHeight) {
        space.removeChild(bullet);
      } else {
        requestAnimationFrame(moveBullet);
      }
    }
    moveBullet();
  });
  function spawnMovingElement() {
    var movingElementHorizontal = document.createElement('div');
    var movingElementVertical = document.createElement('div');
    movingElementHorizontal.className = 'moving-element-horizontal';
    movingElementVertical.className = 'moving-element-vertical';
    document.body.appendChild(movingElementHorizontal);
    document.body.appendChild(movingElementVertical);
    var horizontalStartX = Math.random() < 0.5 ? -50 : window.innerWidth + 50; // Поза лівим або правим краєм екрану
    var horizontalStartY = Math.random() * window.innerHeight;
    var verticalStartY = Math.random() < 0.5 ? -50 : window.innerHeight + 50; // Поза лівим або правим краєм екрану
    var verticalStartX = Math.random() * window.innerWidth;
    movingElementHorizontal.style.left = horizontalStartX + 'px';
    movingElementHorizontal.style.top = horizontalStartY + 'px';
    movingElementHorizontal.style.animation = 'moveToCenter 5s linear';
    movingElementVertical.style.left = verticalStartX + 'px';
    movingElementVertical.style.top = verticalStartY + 'px';
    movingElementVertical.style.animation = 'moveToCenter 5s linear';
    if (checkCollision(movingElementHorizontal, earth)) {
      document.body.removeChild(movingElementHorizontal);
    }
    movingElementHorizontal.addEventListener('animationend', function () {
      document.body.removeChild(movingElementHorizontal);
    });
    movingElementVertical.addEventListener('animationend', function () {
      document.body.removeChild(movingElementVertical);
    });
  }
  function spawnElementsWithInterval() {
    setInterval(spawnMovingElement, Math.random() * 2000 + 1000);
  }
  spawnElementsWithInterval();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic3BhY2UiLCJxdWVyeVNlbGVjdG9yIiwiZWFydGhDb250YWluZXIiLCJlYXJ0aCIsInNoaXAiLCJnZXRFbGVtZW50QnlJZCIsImNvbnRhaW5lclJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJlYXJ0aFJhZGl1cyIsIndpZHRoIiwic2NvcmUiLCJjb25zb2xlIiwibG9nIiwidXBkYXRlU2hpcFBvc2l0aW9uIiwiYW5nbGUiLCJzaGlwWCIsImxlZnQiLCJNYXRoIiwiY29zIiwic2hpcFkiLCJ0b3AiLCJoZWlnaHQiLCJzaW4iLCJzdHlsZSIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwidHJhbnNmb3JtIiwiY29uY2F0IiwiY2hlY2tDb2xsaXNpb24iLCJidWxsZXQiLCJtb3ZpbmdFbGVtZW50IiwiYnVsbGV0UmVjdCIsIm1vdmluZ0VsZW1lbnRSZWN0IiwicmlnaHQiLCJib3R0b20iLCJzZXRTY29yZSIsInNjb3JlVmlldyIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJhcHBlbmRDaGlsZCIsImlubmVySFRNTCIsInJlbW92ZVNjb3JlIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiZSIsIm1vdXNlWCIsImNsaWVudFgiLCJtb3VzZVkiLCJjbGllbnRZIiwib3BhY2l0eSIsImF0YW4yIiwiY2FuRmlyZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJwb3NpdGlvbiIsImJhY2tncm91bmQiLCJzZXRUaW1lb3V0IiwiYnVsbGV0U3BlZWQiLCJidWxsZXREWCIsImJ1bGxldERZIiwibW92ZUJ1bGxldCIsImJ1bGxldFgiLCJwYXJzZUZsb2F0IiwiYnVsbGV0WSIsIm1vdmluZ0VsZW1lbnRzSG9yaXpvbnRhbCIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJzIiwibiIsImRvbmUiLCJ2YWx1ZSIsImVyciIsImYiLCJtb3ZpbmdFbGVtZW50c1ZlcnRpY2FsIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsImJvZHkiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzcGF3bk1vdmluZ0VsZW1lbnQiLCJtb3ZpbmdFbGVtZW50SG9yaXpvbnRhbCIsIm1vdmluZ0VsZW1lbnRWZXJ0aWNhbCIsImhvcml6b250YWxTdGFydFgiLCJyYW5kb20iLCJob3Jpem9udGFsU3RhcnRZIiwidmVydGljYWxTdGFydFkiLCJ2ZXJ0aWNhbFN0YXJ0WCIsImFuaW1hdGlvbiIsInNwYXduRWxlbWVudHNXaXRoSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQUEsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0VBQ2hELElBQU1DLEtBQUssR0FBR0YsUUFBUSxDQUFDRyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQzlDLElBQU1DLGNBQWMsR0FBR0osUUFBUSxDQUFDRyxhQUFhLENBQUMsa0JBQWtCLENBQUM7RUFDakUsSUFBTUUsS0FBSyxHQUFHTCxRQUFRLENBQUNHLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDOUMsSUFBTUcsSUFBSSxHQUFHTixRQUFRLENBQUNPLGNBQWMsQ0FBQyxNQUFNLENBQUM7RUFDNUMsSUFBTUMsYUFBYSxHQUFHSixjQUFjLENBQUNLLHFCQUFxQixFQUFFO0VBQzVELElBQUlDLFdBQVcsR0FBR0YsYUFBYSxDQUFDRyxLQUFLLEdBQUcsQ0FBQztFQUN6QyxJQUFJQyxLQUFLLEdBQUcsQ0FBQztFQUdiQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ04sYUFBYSxDQUFDO0VBRTFCLFNBQVNPLGtCQUFrQkEsQ0FBQ0MsS0FBSyxFQUFFO0lBQy9CLElBQUlDLEtBQUssR0FBR1QsYUFBYSxDQUFDVSxJQUFJLEdBQUdWLGFBQWEsQ0FBQ0csS0FBSyxHQUFHLENBQUMsR0FBR0QsV0FBVyxHQUFHUyxJ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RWxFTixxQkFBcUIsQ0FBQzdELEtBQUssQ0FBQ1AsSUFBSSxHQUFHeUUsY0FBYyxHQUFHLElBQUk7SUFDeERMLHFCQUFxQixDQUFDN0QsS0FBSyxDQUFDSCxHQUFHLEdBQUdvRSxjQUFjLEdBQUcsSUFBSTtJQUN2REoscUJBQXFCLENBQUM3RCxLQUFLLENBQUNtRSxTQUFTLEdBQUcsd0JBQXdCO0lBRWhFLElBQUc5RCxjQUFjLENBQUN1RCx1QkFBdUIsRUFBRWhGLEtBQUssQ0FBQyxFQUFDO01BQzlDTCxRQUFRLENBQUMrRSxJQUFJLENBQUNsQyxXQUFXLENBQUN3Qyx1QkFBdUIsQ0FBQztJQUN0RDtJQUVBQSx1QkFBdUIsQ0FBQ3BGLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxZQUFNO01BRTNERCxRQUFRLENBQUMrRSxJQUFJLENBQUNsQyxXQUFXLENBQUN3Qyx1QkFBdUIsQ0FBQztJQUN0RCxDQUFDLENBQUM7SUFDRkMscUJBQXFCLENBQUNyRixnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsWUFBTTtNQUN6REQsUUFBUSxDQUFDK0UsSUFBSSxDQUFDbEMsV0FBVyxDQUFDeUMscUJBQXFCLENBQUM7SUFDcEQsQ0FBQyxDQUFDO0VBQ047RUFFQSxTQUFTTyx5QkFBeUJBLENBQUEsRUFBRztJQUNqQ0MsV0FBVyxDQUFDVixrQkFBa0IsRUFBR2pFLElBQUksQ0FBQ3FFLE1BQU0sRUFBRSxHQUFHLElBQUksR0FBSSxJQUFJLENBQUM7RUFDbEU7RUFFQUsseUJBQXlCLEVBQUU7QUFJL0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IHNwYWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlJylcbiAgICBjb25zdCBlYXJ0aENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lYXJ0aC1jb250YWluZXInKTtcbiAgICBjb25zdCBlYXJ0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlYXJ0aCcpXG4gICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwJyk7XG4gICAgY29uc3QgY29udGFpbmVyUmVjdCA9IGVhcnRoQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBlYXJ0aFJhZGl1cyA9IGNvbnRhaW5lclJlY3Qud2lkdGggLyAyO1xuICAgIGxldCBzY29yZSA9IDA7XG5cblxuICAgIGNvbnNvbGUubG9nKGNvbnRhaW5lclJlY3QpO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2hpcFBvc2l0aW9uKGFuZ2xlKSB7XG4gICAgICAgIGxldCBzaGlwWCA9IGNvbnRhaW5lclJlY3QubGVmdCArIGNvbnRhaW5lclJlY3Qud2lkdGggLyAyICsgZWFydGhSYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIGxldCBzaGlwWSA9IGNvbnRhaW5lclJlY3QudG9wICsgY29udGFpbmVyUmVjdC5oZWlnaHQgLyAyICsgZWFydGhSYWRpdXMgKiBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICAgICAgc2hpcC5zdHlsZS5sZWZ0ID0gc2hpcFggLSBzaGlwLmNsaWVudFdpZHRoIC8gMiArICdweCc7XG4gICAgICAgIHNoaXAuc3R5bGUudG9wID0gc2hpcFkgLSBzaGlwLmNsaWVudEhlaWdodCAvIDIgKyAncHgnO1xuICAgICAgICBzaGlwLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHthbmdsZX1yYWQpYDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tDb2xsaXNpb24oYnVsbGV0LCBtb3ZpbmdFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGJ1bGxldFJlY3QgPSBidWxsZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IG1vdmluZ0VsZW1lbnRSZWN0ID0gbW92aW5nRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJnYW1lb3ZlclwiKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBidWxsZXRSZWN0LmxlZnQgPCBtb3ZpbmdFbGVtZW50UmVjdC5yaWdodCAmJlxuICAgICAgICAgICAgYnVsbGV0UmVjdC5yaWdodCA+IG1vdmluZ0VsZW1lbnRSZWN0LmxlZnQgJiZcbiAgICAgICAgICAgIGJ1bGxldFJlY3QudG9wIDwgbW92aW5nRWxlbWVudFJlY3QuYm90dG9tICYmXG4gICAgICAgICAgICBidWxsZXRSZWN0LmJvdHRvbSA+IG1vdmluZ0VsZW1lbnRSZWN0LnRvcFxuXG4gICAgICAgICk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFNjb3JlKHNjb3JlKXtcbiAgICAgICAgY29uc3Qgc2NvcmVWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgc2NvcmVWaWV3LmNsYXNzTmFtZSA9ICdzY29yZSdcbiAgICAgICAgc3BhY2UuYXBwZW5kQ2hpbGQoc2NvcmVWaWV3KVxuICAgICAgICBzY29yZVZpZXcuaW5uZXJIVE1MID0gYDxoMT55b3VyIHNjb3JlPC9oMT4gOiA8c3Bhbj4ke3Njb3JlfTwvc3Bhbj5gXG5cblxuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVTY29yZSgpe1xuICAgICAgIGNvbnN0IHNjb3JlVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpXG4gICAgICAgIHNjb3JlVmlldy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjb3JlVmlldylcbiAgICB9XG4gICAgc2V0U2NvcmUoc2NvcmUpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICAgICAgbGV0IG1vdXNlWCA9IGUuY2xpZW50WCAtIGNvbnRhaW5lclJlY3QubGVmdDtcbiAgICAgICAgbGV0IG1vdXNlWSA9IGUuY2xpZW50WSAtIGNvbnRhaW5lclJlY3QudG9wO1xuICAgICAgICBzaGlwLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcblxuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLmF0YW4yKG1vdXNlWSAtIGNvbnRhaW5lclJlY3QuaGVpZ2h0IC8gMiwgbW91c2VYIC0gY29udGFpbmVyUmVjdC53aWR0aCAvIDIpO1xuICAgICAgICB1cGRhdGVTaGlwUG9zaXRpb24oYW5nbGUpO1xuICAgIH0pO1xuXG4gICAgbGV0IGNhbkZpcmUgPSAxXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT57XG4gICAgICAgIGNvbnN0IGJ1bGxldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGxldCBtb3VzZVggPSBlLmNsaWVudFggLSBjb250YWluZXJSZWN0LmxlZnQ7XG4gICAgICAgIGxldCBtb3VzZVkgPSBlLmNsaWVudFkgLSBjb250YWluZXJSZWN0LnRvcDtcbiAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5hdGFuMihtb3VzZVkgLSBjb250YWluZXJSZWN0LmhlaWdodCAvIDIsIG1vdXNlWCAtIGNvbnRhaW5lclJlY3Qud2lkdGggLyAyKTtcbiAgICAgICAgdXBkYXRlU2hpcFBvc2l0aW9uKGFuZ2xlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2FuRmlyZSlcbiAgICAgICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ1bGxldCcpLmxlbmd0aClcbiAgICAgICAgaWYgKGNhbkZpcmUgPD0gMSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnVsbGV0JykubGVuZ3RoIDwgNil7XG4gICAgICAgICAgICBjYW5GaXJlKytcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCBjYW5GaXJlKVxuICAgICAgICAgICAgYnVsbGV0LmNsYXNzTmFtZSA9ICdidWxsZXQnO1xuICAgICAgICAgICAgYnVsbGV0LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIGJ1bGxldC5zdHlsZS53aWR0aCA9ICc0MHB4JztcbiAgICAgICAgICAgIGJ1bGxldC5zdHlsZS5oZWlnaHQgPSAnMTBweCc7XG4gICAgICAgICAgICBidWxsZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdyZWQnO1xuICAgICAgICAgICAgc3BhY2UuYXBwZW5kQ2hpbGQoYnVsbGV0KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2hvdFwiKVxuICAgICAgICAgICAgYnVsbGV0LnN0eWxlLmxlZnQgPSBzaGlwLnN0eWxlLmxlZnQ7XG4gICAgICAgICAgICBidWxsZXQuc3R5bGUudG9wID0gc2hpcC5zdHlsZS50b3A7XG4gICAgICAgICAgICBidWxsZXQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke2FuZ2xlfXJhZClgO1xuXG4gICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICBjYW5GaXJlID0gMVxuICAgICAgICAgICAgfSwgNTAwKVxuXG5cblxuICAgICAgICBjb25zdCBidWxsZXRTcGVlZCA9IDk7XG4gICAgICAgIGNvbnN0IGJ1bGxldERYID0gYnVsbGV0U3BlZWQgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIGNvbnN0IGJ1bGxldERZID0gYnVsbGV0U3BlZWQgKiBNYXRoLnNpbihhbmdsZSk7XG5cblxuXG5cbiAgICAgICAgZnVuY3Rpb24gbW92ZUJ1bGxldCgpIHtcblxuXG4gICAgICAgICAgICBsZXQgYnVsbGV0WCA9IHBhcnNlRmxvYXQoYnVsbGV0LnN0eWxlLmxlZnQpO1xuICAgICAgICAgICAgbGV0IGJ1bGxldFkgPSBwYXJzZUZsb2F0KGJ1bGxldC5zdHlsZS50b3ApO1xuXG4gICAgICAgICAgICBidWxsZXQuc3R5bGUubGVmdCA9IGJ1bGxldFggKyBidWxsZXREWCArICdweCc7XG4gICAgICAgICAgICBidWxsZXQuc3R5bGUudG9wID0gYnVsbGV0WSArIGJ1bGxldERZICsgJ3B4JztcblxuICAgICAgICAgICAgY29uc3QgbW92aW5nRWxlbWVudHNIb3Jpem9udGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vdmluZy1lbGVtZW50LWhvcml6b250YWwnKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbW92aW5nRWxlbWVudCBvZiBtb3ZpbmdFbGVtZW50c0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tDb2xsaXNpb24oYnVsbGV0LCBtb3ZpbmdFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBzcGFjZS5yZW1vdmVDaGlsZChidWxsZXQpO1xuICAgICAgICAgICAgICAgICAgICBtb3ZpbmdFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobW92aW5nRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVNjb3JlKClcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUrK1xuICAgICAgICAgICAgICAgICAgICBzZXRTY29yZShzY29yZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAgLy8g0JLQuNGF0L7QtNC40LzQviDQtyDRhtC40LrQu9GDLCDQsdC+INCy0LbQtSDQstC40LTQsNC70LjQu9C4INC10LvQtdC80LXQvdGCXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbW92aW5nRWxlbWVudHNWZXJ0aWNhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb3ZpbmctZWxlbWVudC12ZXJ0aWNhbCcpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBtb3ZpbmdFbGVtZW50IG9mIG1vdmluZ0VsZW1lbnRzVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tDb2xsaXNpb24oYnVsbGV0LCBtb3ZpbmdFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBzcGFjZS5yZW1vdmVDaGlsZChidWxsZXQpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG1vdmluZ0VsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVTY29yZSgpXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlKytcbiAgICAgICAgICAgICAgICAgICAgc2V0U2NvcmUoc2NvcmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjsgIC8vINCS0LjRhdC+0LTQuNC80L4g0Lcg0YbQuNC60LvRgywg0LHQviDQstC20LUg0LLQuNC00LDQu9C40LvQuCDQtdC70LXQvNC10L3RglxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgYnVsbGV0WCA8IDAgfHwgYnVsbGV0WCA+IHdpbmRvdy5pbm5lcldpZHRoIHx8XG4gICAgICAgICAgICAgICAgYnVsbGV0WSA8IDAgfHwgYnVsbGV0WSA+IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3BhY2UucmVtb3ZlQ2hpbGQoYnVsbGV0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1vdmVCdWxsZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbW92ZUJ1bGxldCgpO1xuICAgIH0pO1xuXG5cblxuICAgIGZ1bmN0aW9uIHNwYXduTW92aW5nRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgbW92aW5nRWxlbWVudEhvcml6b250YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbW92aW5nRWxlbWVudFZlcnRpY2FsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgbW92aW5nRWxlbWVudEhvcml6b250YWwuY2xhc3NOYW1lID0gJ21vdmluZy1lbGVtZW50LWhvcml6b250YWwnO1xuICAgICAgICBtb3ZpbmdFbGVtZW50VmVydGljYWwuY2xhc3NOYW1lID0gJ21vdmluZy1lbGVtZW50LXZlcnRpY2FsJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb3ZpbmdFbGVtZW50SG9yaXpvbnRhbCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW92aW5nRWxlbWVudFZlcnRpY2FsKTtcblxuICAgICAgICBjb25zdCBob3Jpem9udGFsU3RhcnRYID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IC01MCA6IHdpbmRvdy5pbm5lcldpZHRoICsgNTA7IC8vINCf0L7Qt9CwINC70ZbQstC40Lwg0LDQsdC+INC/0YDQsNCy0LjQvCDQutGA0LDRlNC8INC10LrRgNCw0L3Rg1xuICAgICAgICBjb25zdCBob3Jpem9udGFsU3RhcnRZID0gTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBjb25zdCB2ZXJ0aWNhbFN0YXJ0WSA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyAtNTAgOiB3aW5kb3cuaW5uZXJIZWlnaHQgKyA1MDsgLy8g0J/QvtC30LAg0LvRltCy0LjQvCDQsNCx0L4g0L/RgNCw0LLQuNC8INC60YDQsNGU0Lwg0LXQutGA0LDQvdGDXG4gICAgICAgIGNvbnN0IHZlcnRpY2FsU3RhcnRYID0gTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoO1xuXG5cbiAgICAgICAgbW92aW5nRWxlbWVudEhvcml6b250YWwuc3R5bGUubGVmdCA9IGhvcml6b250YWxTdGFydFggKyAncHgnO1xuICAgICAgICBtb3ZpbmdFbGVtZW50SG9yaXpvbnRhbC5zdHlsZS50b3AgPSBob3Jpem9udGFsU3RhcnRZICsgJ3B4JztcbiAgICAgICAgbW92aW5nRWxlbWVudEhvcml6b250YWwuc3R5bGUuYW5pbWF0aW9uID0gJ21vdmVUb0NlbnRlciA1cyBsaW5lYXInO1xuXG4gICAgICAgIG1vdmluZ0VsZW1lbnRWZXJ0aWNhbC5zdHlsZS5sZWZ0ID0gdmVydGljYWxTdGFydFggKyAncHgnO1xuICAgICAgICBtb3ZpbmdFbGVtZW50VmVydGljYWwuc3R5bGUudG9wID0gdmVydGljYWxTdGFydFkgKyAncHgnO1xuICAgICAgICBtb3ZpbmdFbGVtZW50VmVydGljYWwuc3R5bGUuYW5pbWF0aW9uID0gJ21vdmVUb0NlbnRlciA1cyBsaW5lYXInO1xuXG4gICAgICAgIGlmKGNoZWNrQ29sbGlzaW9uKG1vdmluZ0VsZW1lbnRIb3Jpem9udGFsLCBlYXJ0aCkpe1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChtb3ZpbmdFbGVtZW50SG9yaXpvbnRhbCk7XG4gICAgICAgIH1cblxuICAgICAgICBtb3ZpbmdFbGVtZW50SG9yaXpvbnRhbC5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobW92aW5nRWxlbWVudEhvcml6b250YWwpO1xuICAgICAgICB9KTtcbiAgICAgICAgbW92aW5nRWxlbWVudFZlcnRpY2FsLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobW92aW5nRWxlbWVudFZlcnRpY2FsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3Bhd25FbGVtZW50c1dpdGhJbnRlcnZhbCgpIHtcbiAgICAgICAgc2V0SW50ZXJ2YWwoc3Bhd25Nb3ZpbmdFbGVtZW50LCAoTWF0aC5yYW5kb20oKSAqIDIwMDApICsgMTAwMCk7XG4gICAgfVxuXG4gICAgc3Bhd25FbGVtZW50c1dpdGhJbnRlcnZhbCgpO1xuXG5cblxufSk7XG4iXX0=