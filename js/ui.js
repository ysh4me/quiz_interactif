const UI = {
    ecrans: {
        accueil: document.getElementById('ecran-accueil'),
        quiz: document.getElementById('ecran-quiz'),
        resultat: document.getElementById('ecran-resultat')
    },
    
    elements: {
        questionTitre: document.getElementById('question-titre'),
        reponsesContainer: document.getElementById('reponses-container'),
        questionActuelle: document.getElementById('question-actuelle'),
        totalQuestions: document.getElementById('total-questions'),
        progression: document.getElementById('progression'),
        scoreFinal: document.getElementById('score-final'),
        scoreTotal: document.getElementById('score-total'),
        pourcentage: document.getElementById('pourcentage'),
        resumeReponses: document.getElementById('resume-reponses')
    },
    
    boutons: {
        commencer: document.getElementById('btn-commencer'),
        precedent: document.getElementById('btn-precedent'),
        suivant: document.getElementById('btn-suivant'),
        valider: document.getElementById('btn-valider'),
        recommencer: document.getElementById('btn-recommencer')
    },
    
    afficherEcran(ecran) {
        Object.values(this.ecrans).forEach(e => {
            e.classList.add('hidden');
            e.classList.remove('block');
        });
        ecran.classList.remove('hidden');
        ecran.classList.add('block');
    },
    
    afficherQuestion(question, numeroQuestion, totalQuestions) {
        this.elements.questionTitre.textContent = question.question;
        this.elements.questionActuelle.textContent = numeroQuestion + 1;
        this.elements.totalQuestions.textContent = totalQuestions;
        
        this.elements.reponsesContainer.innerHTML = '';
        
        question.reponses.forEach((reponse, index) => {
            const btnReponse = document.createElement('button');
            btnReponse.className = `
                w-full text-left p-4 rounded-lg border-2 border-gray-200 
                bg-gray-50 hover:bg-gray-100 transition duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500
            `;
            btnReponse.textContent = reponse;
            btnReponse.dataset.index = index;
            this.elements.reponsesContainer.appendChild(btnReponse);
        });
    },
    
    mettreAJourProgression(pourcentage) {
        this.elements.progression.style.width = pourcentage + '%';
    },
    
    mettreAJourSelectionReponse(bouton) {
        const toutesReponses = this.elements.reponsesContainer.querySelectorAll('button');
        toutesReponses.forEach(b => {
            b.className = `
                w-full text-left p-4 rounded-lg border-2 border-gray-200 
                bg-gray-50 hover:bg-gray-100 transition duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500
            `;
        });
        
        bouton.className = `
            w-full text-left p-4 rounded-lg border-2 border-blue-500 
            bg-blue-50 hover:bg-blue-100 transition duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500
        `;
    },
    
    afficherResultats(score, total, resume) {
        this.elements.scoreFinal.textContent = score;
        this.elements.scoreTotal.textContent = total;
        const pourcentage = Math.round((score / total) * 100);
        this.elements.pourcentage.textContent = pourcentage + '%';
        
        this.elements.resumeReponses.innerHTML = '';
        resume.forEach(item => {
            const div = document.createElement('div');
            
            if (item.correct) {
                div.className = 'p-4 rounded-lg bg-green-50 border border-green-300';
            } else {
                div.className = 'p-4 rounded-lg bg-red-50 border border-red-300';
            }
            
            div.innerHTML = `
                <p class="font-semibold text-gray-800">Question ${item.numero}: ${item.question}</p>
                <p class="mt-2">
                    <span class="text-gray-600">Votre réponse:</span> 
                    <span class="${item.correct ? 'text-green-700' : 'text-red-700'} font-medium">
                        ${item.reponseUtilisateur || 'Aucune'}
                    </span>
                </p>
                <p>
                    <span class="text-gray-600">Réponse correcte:</span> 
                    <span class="text-green-700 font-medium">${item.reponseCorrecte}</span>
                </p>
            `;
            this.elements.resumeReponses.appendChild(div);
        });
    },
    
    gererEtatBoutons(peutAllerPrecedent, estDerniere) {
        this.boutons.precedent.disabled = !peutAllerPrecedent;
        if (!peutAllerPrecedent) {
            this.boutons.precedent.classList.add('disabled:opacity-50', 'disabled:cursor-not-allowed');
        } else {
            this.boutons.precedent.classList.remove('disabled:opacity-50', 'disabled:cursor-not-allowed');
        }
        
        if (estDerniere) {
            this.boutons.suivant.classList.add('hidden');
            this.boutons.valider.classList.remove('hidden');
        } else {
            this.boutons.suivant.classList.remove('hidden');
            this.boutons.valider.classList.add('hidden');
        }
    }
};