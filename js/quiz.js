class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.questionActuelle = 0;
        this.reponses = new Array(questions.length).fill(null);
        this.score = 0;
        this.init();
    }
    
    init() {
        UI.boutons.commencer.addEventListener('click', () => this.commencer());
        UI.boutons.suivant.addEventListener('click', () => this.questionSuivante());
        UI.boutons.precedent.addEventListener('click', () => this.questionPrecedente());
        UI.boutons.valider.addEventListener('click', () => this.terminer());
        UI.boutons.recommencer.addEventListener('click', () => this.recommencer());
        
        UI.elements.reponsesContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                this.selectionnerReponse(e.target);
            }
        });

        document.getElementById('btn-historique').addEventListener('click', () => {
            UI.afficherEcran(document.getElementById('ecran-historique'));
            document.getElementById('contenu-historique').innerHTML = Historique.afficher();
        });

        document.getElementById('btn-retour').addEventListener('click', () => {
            UI.afficherEcran(UI.ecrans.resultat);
        });

        document.getElementById('btn-effacer-historique').addEventListener('click', () => {
            if (confirm('Êtes-vous sûr de vouloir effacer l\'historique ?')) {
                Historique.effacer();
                document.getElementById('contenu-historique').innerHTML = Historique.afficher();
            }
        });
    }
    
    commencer() {
        this.questionActuelle = 0;
        this.reponses = new Array(this.questions.length).fill(null);
        this.score = 0;
        
        UI.afficherEcran(UI.ecrans.quiz);
        this.afficherQuestionActuelle();
    }
    
    afficherQuestionActuelle() {
        const question = this.questions[this.questionActuelle];
        UI.afficherQuestion(question, this.questionActuelle, this.questions.length);
        
        const progression = ((this.questionActuelle + 1) / this.questions.length) * 100;
        UI.mettreAJourProgression(progression);
        
        UI.gererEtatBoutons(
            this.questionActuelle > 0, 
            this.questionActuelle === this.questions.length - 1
        );
        
        if (this.reponses[this.questionActuelle] !== null) {
            const boutons = UI.elements.reponsesContainer.querySelectorAll('button');
            const boutonSelectionne = boutons[this.reponses[this.questionActuelle]];
            UI.mettreAJourSelectionReponse(boutonSelectionne);
        }
    }
    
    selectionnerReponse(bouton) {
        this.reponses[this.questionActuelle] = parseInt(bouton.dataset.index);
        
        UI.mettreAJourSelectionReponse(bouton);
    }
    
    questionSuivante() {
        if (this.questionActuelle < this.questions.length - 1) {
            this.questionActuelle++;
            this.afficherQuestionActuelle();
        }
    }
    
    questionPrecedente() {
        if (this.questionActuelle > 0) {
            this.questionActuelle--;
            this.afficherQuestionActuelle();
        }
    }
    
    terminer() {
        this.score = 0;
        const resume = [];
        
        this.questions.forEach((question, index) => {
            const reponseUtilisateur = this.reponses[index];
            const correct = reponseUtilisateur === question.reponseCorrecte;
            
            if (correct) {
                this.score++;
            }
            
            resume.push({
                numero: index + 1,
                question: question.question,
                reponseUtilisateur: reponseUtilisateur !== null ? question.reponses[reponseUtilisateur] : null,
                reponseCorrecte: question.reponses[question.reponseCorrecte],
                correct: correct
            });
        });
        
        this.sauvegarderResultat();
        
        UI.afficherEcran(UI.ecrans.resultat);
        UI.afficherResultats(this.score, this.questions.length, resume);
    }
    
    recommencer() {
        UI.afficherEcran(UI.ecrans.accueil);
    }
    
    sauvegarderResultat() {
        const resultat = {
            date: new Date().toISOString(),
            score: this.score,
            total: this.questions.length,
            pourcentage: Math.round((this.score / this.questions.length) * 100)
        };
        
        let historique = JSON.parse(localStorage.getItem('quizHistorique')) || [];
        
        historique.push(resultat);
        
        if (historique.length > 10) {
            historique = historique.slice(-10);
        }
        
        localStorage.setItem('quizHistorique', JSON.stringify(historique));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const quiz = new Quiz(questions);
});