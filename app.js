class TypeWritter {

    constructor(txtEle, words, wait = 3000) {

        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.txtElement = txtEle;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {

        // Current index of word
        const current = this.wordIndex % this.words.length;

        //Get Full text of current word

        const fullTxt = this.words[current];

        // Check if deleting

        if (this.isDeleting) {

            // Remove a char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {

            // Add a char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }


        // Insert txt element to element

        this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`

        // Initial Type Speed

        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2 //typespeed = typspeed/2;
        }

        //If word is complete.
        if (!this.isDeleting && this.txt === fullTxt) {

            //Make pause at end
            typeSpeed = this.wait;

            // Set isDeleting to true

            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;

            // Move to next word
            this.wordIndex++;

            // Pause before start typing

            typeSpeed = 500;
        }



        setTimeout(() => {
            this.type();
        }, typeSpeed);
    }
}

//Init On DOM Load

document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));

    const wait = txtElement.getAttribute('data-wait');

    new TypeWritter(txtElement, words, wait);
}