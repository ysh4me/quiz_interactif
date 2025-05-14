const Historique = {
    recuperer() {
        return JSON.parse(localStorage.getItem('quizHistorique')) || [];
    },
    
    afficher() {
        const historique = this.recuperer();
        
        if (historique.length === 0) {
            return '<p class="text-gray-500 text-center">Aucun historique disponible</p>';
        }
        
        let html = '<div class="space-y-2">';
        historique.reverse().forEach((resultat, index) => {
            const date = new Date(resultat.date);
            const dateFormatee = date.toLocaleDateString('fr-FR') + ' à ' + date.toLocaleTimeString('fr-FR');
            
            html += `
                <div class="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                    <span class="text-sm text-gray-600">${dateFormatee}</span>
                    <span class="font-semibold ${resultat.pourcentage >= 70 ? 'text-green-600' : 'text-red-600'}">
                        ${resultat.score}/${resultat.total} (${resultat.pourcentage}%)
                    </span>
                </div>
            `;
        });
        html += '</div>';
        
        return html;
    },
    
    effacer() {
        localStorage.removeItem('quizHistorique');
    }
};