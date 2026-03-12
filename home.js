const faqs = document.querySelectorAll('.question-cont');

faqs.forEach(questions => {
	questions.addEventListener('click', () => {
        const answer = questions.querySelector('.answer');
	    answer.classList.toggle('show-answer')
    });
});
