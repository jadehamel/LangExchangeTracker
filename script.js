document.addEventListener('DOMContentLoaded', () => {
    const partnerInput = document.getElementById('partner-name');
    const addPartnerButton = document.getElementById('add-partner-button');
    const partnerList = document.getElementById('partner-list');
    const partnerSelect = document.getElementById('partner-select');
    const sessionNotesInput = document.getElementById('session-notes');
    const sessionDurationInput = document.getElementById('session-duration');
    const addSessionButton = document.getElementById('add-session-button');
    const sessionList = document.getElementById('session-list');

    let partners = JSON.parse(localStorage.getItem('partners')) || [];
    let sessions = JSON.parse(localStorage.getItem('sessions')) || [];

    function savePartners() {
        localStorage.setItem('partners', JSON.stringify(partners));
    }

    function saveSessions() {
        localStorage.setItem('sessions', JSON.stringify(sessions));
    }

    function renderPartners() {
        partnerList.innerHTML = '';
        partnerSelect.innerHTML = '<option value="">Select Partner</option>';
        partners.forEach(partner => {
            const li = document.createElement('li');
            li.textContent = partner.name;
            partnerList.appendChild(li);

            const option = document.createElement('option');
            option.value = partner.name;
            option.textContent = partner.name;
            partnerSelect.appendChild(option);
        });
    }

    function renderSessions() {
        sessionList.innerHTML = '';
        sessions.forEach(session => {
            const li = document.createElement('li');
            li.textContent = `${session.partner} - ${session.notes} (${session.duration} minutes)`;
            sessionList.appendChild(li);
        });
    }

    addPartnerButton.addEventListener('click', () => {
        const partnerName = partnerInput.value.trim();
        if (partnerName) {
            partners.push({ name: partnerName });
            savePartners();
            renderPartners();
            partnerInput.value = '';
        }
    });

    addSessionButton.addEventListener('click', () => {
        const partnerName = partnerSelect.value;
        const sessionNotes = sessionNotesInput.value.trim();
        const sessionDuration = parseInt(sessionDurationInput.value);
        if (partnerName && sessionNotes && sessionDuration) {
            sessions.push({ partner: partnerName, notes: sessionNotes, duration: sessionDuration });
            saveSessions();
            renderSessions();
            sessionNotesInput.value = '';
            sessionDurationInput.value = '';
        }
    });

    renderPartners();
    renderSessions();
});
