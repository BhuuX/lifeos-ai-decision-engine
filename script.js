/**
 * LifeOS AI – Decision Engine
 * Author: Antigravity (Advanced Agentic Coding Team)
 * Core logic for context detection, decision generation, and memory.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const userInput = document.getElementById('userInput');
    const submitBtn = document.getElementById('submitBtn');
    const clearMemoryBtn = document.getElementById('clearMemory');
    const outputCard = document.getElementById('outputCard');
    const errorMessage = document.getElementById('errorMessage');
    const historySection = document.getElementById('historySection');
    const lastSessionContent = document.getElementById('lastSessionContent');
    
    // Output Fields
    const outDecision = document.getElementById('outDecision');
    const outStrategy = document.getElementById('outStrategy');
    const outPlan = document.getElementById('outPlan');
    const outAdvice = document.getElementById('outAdvice');
    const outConfidence = document.getElementById('outConfidence');
    const modeBadge = document.getElementById('modeBadge');
    const addToCalendarBtn = document.getElementById('addToCalendar');

    // State
    let currentPlan = '';
    let isProcessing = false;

    // Initialize: Check for last session
    loadLastSession();

    // Event Listeners
    submitBtn.addEventListener('click', handleProcess);
    clearMemoryBtn.addEventListener('click', clearMemory);
    
    userInput.addEventListener('input', () => {
        errorMessage.style.display = 'none';
        userInput.style.borderColor = '';
    });

    /**
     * Main Processing Loop
     */
    function handleProcess() {
        if (isProcessing) return;
        
        const input = userInput.value.trim();

        // Edge Case: Validation
        if (input.length < 5) {
            showError();
            return;
        }

        isProcessing = true;
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.textContent = 'Processing...';

        // 1. Analyze Context
        const context = analyzeContext(input);
        
        // 2. Generate Decision Components
        const result = generateDecision(input, context);
        
        // 3. Save to Memory
        saveSession(input, result);

        // 4. Render UI
        renderOutput(result);
    }

    /**
     * Module 1: Context Detection Engine
     */
    function analyzeContext(text) {
        const lowerText = text.toLowerCase();
        
        // Urgency Detection
        let mode = 'NORMAL';
        const emergencyKeywords = ['today', 'tonight', 'now', 'urgent', 'tomorrow', 'deadline', 'asap'];
        const focusKeywords = ['this week', 'days', 'few days', 'week', 'upcoming'];

        if (emergencyKeywords.some(k => lowerText.includes(k))) {
            mode = 'EMERGENCY';
        } else if (focusKeywords.some(k => lowerText.includes(k))) {
            mode = 'FOCUS';
        }

        // Emotion Detection
        const emotionMap = {
            'tired': 'Rest is not laziness; it is a tactical reset.',
            'stressed': 'Clarity comes when you detach from the noise.',
            'confused': 'Simplicity is the antidote to confusion.',
            'distracted': 'Eliminate the non-essential to reclaim your focus.',
            'overwhelmed': 'Break the mountain into pebbles.',
            'anxious': 'Focus on the next logical step, not the final destination.'
        };

        let detectedEmotion = null;
        let emotionAdvice = '';

        for (const [key, advice] of Object.entries(emotionMap)) {
            if (lowerText.includes(key)) {
                detectedEmotion = key;
                emotionAdvice = advice;
                break;
            }
        }

        return { mode, detectedEmotion, emotionAdvice };
    }

    /**
     * Module 2: Decision Engine Logic
     */
    function generateDecision(input, context) {
        const { mode, detectedEmotion, emotionAdvice } = context;
        let decision = '';
        let strategy = '';
        let plan = '';
        let advice = '';

        // Random logic to simulate "intelligent" decision making based on patterns
        if (mode === 'EMERGENCY') {
            decision = `Execute immediate priority mitigation now.`;
            strategy = `Deep-work sprint. Remove all administrative distractions and focus solely on the core deliverable.`;
            plan = `13:00 - 15:00: Core deep work block\n15:00 - 15:30: Tactical review & pivot\n15:30 - 17:00: Final execution & submission`;
            advice = `High urgency requires high discipline. Disable notifications.`;
        } else if (mode === 'FOCUS') {
            decision = `Allocate dedicated milestones across the week.`;
            strategy = `Incremental progress. Prioritize consistency over intensity to avoid burnout.`;
            plan = `Day 1: Information gathering & structure\nDay 2-3: Core production phase\nDay 4: Refinement & polishing`;
            advice = `Set clear boundaries for when you are 'on' and when you are 'off'.`;
        } else {
            decision = `Adopt a sustainable phased approach.`;
            strategy = `Long-term optimization. Focus on building systems that handle this situation automatically in the future.`;
            plan = `Phase 1: Initial assessment & research\nPhase 2: Modular implementation\nPhase 3: Integration & monitoring`;
            advice = `Normal pace allows for better quality control. Don't rush the foundation.`;
        }

        // Incorporate emotion advice if present
        if (detectedEmotion) {
            advice = `${emotionAdvice} Since you mentioned feeling ${detectedEmotion}, prioritize ${advice.toLowerCase()}`;
        }

        const confidence = Math.floor(Math.random() * (98 - 85 + 1)) + 85;

        return { mode, decision, strategy, plan, advice, confidence };
    }

    /**
     * Typing Animation & UI Rendering
     */
    function renderOutput(data) {
        // Reset UI
        outputCard.style.display = 'block';
        outputCard.className = `output-card ${data.mode.toLowerCase()}`;
        modeBadge.textContent = `${getModeEmoji(data.mode)} ${data.mode} Mode`;
        
        // Clear previous content
        outDecision.textContent = '';
        outStrategy.textContent = '';
        outPlan.textContent = '';
        outAdvice.textContent = '';
        outConfidence.textContent = '--';

        // Animate
        typeWriter(outDecision, data.decision, 20, () => {
            typeWriter(outStrategy, data.strategy, 15, () => {
                typeWriter(outPlan, data.plan, 10, () => {
                    typeWriter(outAdvice, data.advice, 15, () => {
                        outConfidence.textContent = data.confidence;
                        updateCalendarLink(data.plan);
                        outputCard.scrollIntoView({ behavior: 'smooth' });
                        
                        // Reset state
                        isProcessing = false;
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                        submitBtn.innerHTML = `Generate Decision <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
                    });
                });
            });
        });
    }

    function typeWriter(element, text, speed, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    function getModeEmoji(mode) {
        switch(mode) {
            case 'EMERGENCY': return '⚠️';
            case 'FOCUS': return '🎯';
            default: return '✅';
        }
    }

    /**
     * Module 3: Google Calendar Integration
     */
    function updateCalendarLink(planText) {
        currentPlan = planText;
        const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
        const title = encodeURIComponent("LifeOS Plan");
        const details = encodeURIComponent(planText);
        
        addToCalendarBtn.onclick = () => {
            const url = `${baseUrl}&text=${title}&details=${details}`;
            window.open(url, '_blank');
        };
    }

    /**
     * Module 4: Memory System (localStorage)
     */
    function saveSession(input, result) {
        try {
            const sessionData = {
                input,
                result,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('lifeos_last_session', JSON.stringify(sessionData));
        } catch (e) {
            console.warn('LocalStorage unavailable:', e);
        }
    }

    function loadLastSession() {
        try {
            const saved = localStorage.getItem('lifeos_last_session');
            if (saved) {
                const { input, result } = JSON.parse(saved);
                historySection.style.display = 'block';
                
                // Create a mini version of the result
                lastSessionContent.innerHTML = `
                    <div class="output-card ${result.mode.toLowerCase()}" style="display: block; margin-top: 10px; opacity: 0.9; transform: scale(0.98);">
                        <div class="mode-badge">${getModeEmoji(result.mode)} Last: ${result.mode}</div>
                        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 10px;">"${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"</p>
                        <div style="font-size: 1rem; border-left: 2px solid var(--border-color); padding-left: 15px;">
                            <strong>Decision:</strong> ${result.decision}
                        </div>
                    </div>
                `;
            }
        } catch (e) {
            console.warn('Error loading session:', e);
        }
    }

    function clearMemory() {
        localStorage.removeItem('lifeos_last_session');
        historySection.style.display = 'none';
        outputCard.style.display = 'none';
        userInput.value = '';
        errorMessage.style.display = 'none';
    }

    function showError() {
        errorMessage.style.display = 'block';
        userInput.style.borderColor = 'var(--accent-emergency)';
        userInput.focus();
    }
});
