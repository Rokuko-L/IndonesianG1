// Global variables
let currentData = [];
let sortColumn = null;
let sortAscending = true;

let currentLang = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark';

// Load race data from JSON
async function loadRaceData(jsonPath) {
    const tableBody = document.getElementById('tableBody');
    const recordCount = document.getElementById('recordCount');
    
    try {
        tableBody.innerHTML = '<tr><td colspan="8" class="loading">Loading race records...</td></tr>';
        
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error('Failed to load data');
        
        currentData = await response.json();
        renderTable(currentData);
        updateRecordCount(currentData.length);
        
    } catch (error) {
        console.error('Error loading data:', error);
        tableBody.innerHTML = '<tr><td colspan="8" class="no-results">Error loading race records. Please ensure the JSON file exists.</td></tr>';
        recordCount.textContent = 'Error loading data';
    }
}

// Render table rows
function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    
    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="no-results">No records found matching your search.</td></tr>';
        return;
    }
    
    tableBody.innerHTML = data.map(record => `
        <tr>
            <td>${escapeHtml(record.number)}</td>
            <td>${escapeHtml(record.year)}</td>
            <td>${escapeHtml(record.venue)}</td>
            <td>${escapeHtml(record.length)}</td>
            <td><a href="https://studbook.or.id/${escapeHtml(record.name).toLowerCase().replace(/\s+/g, '-')}" target="_blank">${escapeHtml(record.name)}</a></td>
            <td>${escapeHtml(record.time)}</td>
            <td>${escapeHtml(record.province)}</td>
            <td>${escapeHtml(record.jockey)}</td>
            <td>${escapeHtml(record.trainer)}</td>
            <td>${escapeHtml(record.owner)}</td>
            <td>${escapeHtml(record.breeder)}</td>
        </tr>
    `).join('');
}

// Update record count
function updateRecordCount(count) {
    const recordCount = document.getElementById('recordCount');
    recordCount.textContent = `Showing ${count} record${count !== 1 ? 's' : ''}`;
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        const filteredData = currentData.filter(record => {
            return Object.values(record).some(value => 
                value.toString().toLowerCase().includes(searchTerm)
            );
        });
        
        renderTable(filteredData);
        updateRecordCount(filteredData.length);
    });
}


// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.toString().replace(/[&<>"']/g, m => map[m]);
}


// Theme toggle
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }
}

// Language toggle
function initLanguage() {
    updateLanguage();
    
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'id' : 'en';
            localStorage.setItem('language', currentLang);
            updateLanguage();
        });
    }
}

function updateLanguage() {
    const t = translations[currentLang];
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            if (el.tagName === 'INPUT') {
                el.placeholder = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });
    
    // Update lang button
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.querySelector('.lang-text').textContent = currentLang.toUpperCase();
    }
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    setupSearch();
    setupSort();
});