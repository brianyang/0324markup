/**
 * Lottie Button Animations
 * This script initializes and controls Lottie animations for buttons
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load Lottie animations
    // Arrow animation - used for primary action buttons
    const arrowAnimation = bodymovin.loadAnimation({
        container: document.getElementById('arrow-animation-container'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'lottie-btn/arrow.json'
    });

    // Scribble animation - used for secondary action buttons or highlighting
    const scribbleAnimation = bodymovin.loadAnimation({
        container: document.getElementById('scribble-animation-container'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'lottie-btn/scribble.json'
    });

    // Get all buttons with animation
    const arrowButtons = document.querySelectorAll('.btn-with-arrow-animation');
    const scribbleButtons = document.querySelectorAll('.btn-with-scribble-animation');

    // Add event listeners to buttons with arrow animation
    arrowButtons.forEach(button => {
        // Play animation on hover
        button.addEventListener('mouseenter', function() {
            const container = this.querySelector('.arrow-animation-container');
            if (container && container._lottie) {
                // Stop any current animation
                container._lottie.stop();
                // Play forward
                container._lottie.setDirection(1);
                container._lottie.goToAndPlay(0, true);
            }
        });
        
        // Reverse animation on hover off
        button.addEventListener('mouseleave', function() {
            const container = this.querySelector('.arrow-animation-container');
            if (container && container._lottie) {
                // Get current frame and play in reverse from there
                const currentFrame = container._lottie.currentFrame;
                container._lottie.stop();
                container._lottie.setDirection(-1);
                container._lottie.playSegments([currentFrame, 0], true);
            }
        });
    });

    // Add event listeners to buttons with scribble animation
    scribbleButtons.forEach(button => {
        // Track animation state
        button.animationState = {
            isPlaying: false,
            isReversing: false
        };
        
        // Play animation on hover
        button.addEventListener('mouseenter', function() {
            const container = this.querySelector('.scribble-animation-container');
            if (container && container._lottie) {
                // Stop current animation
                container._lottie.stop();
                
                // If animation was reversing, start from the current frame
                // Otherwise start from the beginning
                const startFrame = this.animationState.isReversing ? 
                    container._lottie.currentFrame : 0;
                
                // Set state
                this.animationState.isPlaying = true;
                this.animationState.isReversing = false;
                
                // Play forward
                container._lottie.setDirection(1);
                container._lottie.goToAndPlay(startFrame, true);
                
                // Add completion callback
                container._lottie.addEventListener('complete', function() {
                    button.animationState.isPlaying = false;
                });
            }
            
            // Change text color to white
            const textSpan = this.querySelector('span');
            if (textSpan) {
                textSpan.style.color = 'white';
                textSpan.style.transition = 'color 0.3s ease';
            }
        });
        
        // Reverse animation on hover off
        button.addEventListener('mouseleave', function() {
            const container = this.querySelector('.scribble-animation-container');
            if (container && container._lottie) {
                // Stop current animation
                container._lottie.stop();
                
                // Get current frame
                let currentFrame = container._lottie.currentFrame;
                
                // If animation wasn't playing, start from the end
                if (!this.animationState.isPlaying) {
                    currentFrame = container._lottie.totalFrames - 1;
                }
                
                // Set state
                this.animationState.isPlaying = false;
                this.animationState.isReversing = true;
                
                // Play in reverse
                container._lottie.setDirection(-1);
                container._lottie.goToAndPlay(currentFrame, true);
                
                // Ensure animation continues to play and is visible
                setTimeout(function() {
                    if (container._lottie && container._lottie.isPaused) {
                        container._lottie.play();
                    }
                }, 50);
                
                // Add completion callback with deferred execution to avoid event conflicts
                setTimeout(function() {
                    container._lottie.addEventListener('complete', function onComplete() {
                        button.animationState.isReversing = false;
                        // Remove the event listener after it fires once
                        container._lottie.removeEventListener('complete', onComplete);
                    });
                }, 10);
            }
            
            // Reset text color
            const textSpan = this.querySelector('span');
            if (textSpan) {
                textSpan.style.color = '';
            }
        });
    });

    // Function to initialize an arrow animation on a specific button
    window.initArrowAnimation = function(buttonElement) {
        if (!buttonElement) return;
        
        // Create container for the animation
        const animContainer = document.createElement('div');
        animContainer.className = 'arrow-animation-container';
        animContainer.style.position = 'absolute';
        animContainer.style.right = '10px';
        animContainer.style.top = '50%';
        animContainer.style.transform = 'translateY(-50%)';
        animContainer.style.width = '24px';
        animContainer.style.height = '24px';
        animContainer.style.pointerEvents = 'none';
        
        // Add container to button
        buttonElement.style.position = 'relative';
        buttonElement.style.paddingRight = '40px';
        buttonElement.appendChild(animContainer);
        
        // Initialize animation
        const anim = bodymovin.loadAnimation({
            container: animContainer,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'lottie-btn/arrow.json'
        });
        
        // Store animation reference for later access
        animContainer._lottie = anim;
        
        // Add event listeners
        buttonElement.addEventListener('mouseenter', function() {
            anim.stop();
            anim.setDirection(1);
            anim.goToAndPlay(0, true);
        });
        
        // Reverse animation on hover off
        buttonElement.addEventListener('mouseleave', function() {
            const currentFrame = anim.currentFrame;
            anim.stop();
            anim.setDirection(-1);
            anim.playSegments([currentFrame, 0], true);
        });
    };

    // Function to initialize a scribble animation on a specific button
    window.initScribbleAnimation = function(buttonElement) {
        if (!buttonElement) return;
        
        // Create container for the animation
        const animContainer = document.createElement('div');
        animContainer.className = 'scribble-animation-container';
        animContainer.style.position = 'absolute';
        animContainer.style.left = '0';
        animContainer.style.top = '0';
        animContainer.style.width = '100%';
        animContainer.style.height = '100%';
        animContainer.style.pointerEvents = 'none';
        animContainer.style.zIndex = '-1';
        
        // Add container to button
        buttonElement.style.position = 'relative';
        buttonElement.appendChild(animContainer);
        
        // Initialize animation
        const anim = bodymovin.loadAnimation({
            container: animContainer,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'lottie-btn/scribble.json'
        });
        
        // Store animation reference for later access
        animContainer._lottie = anim;
        
        // Track animation state
        buttonElement.animationState = {
            isPlaying: false,
            isReversing: false
        };
        
        // Add event listeners
        buttonElement.addEventListener('mouseenter', function() {
            // Stop current animation
            anim.stop();
            
            // If animation was reversing, start from the current frame
            // Otherwise start from the beginning
            const startFrame = this.animationState.isReversing ? 
                anim.currentFrame : 0;
            
            // Set state
            this.animationState.isPlaying = true;
            this.animationState.isReversing = false;
            
            // Play forward
            anim.setDirection(1);
            anim.goToAndPlay(startFrame, true);
            
            // Add completion callback
            anim.addEventListener('complete', function() {
                buttonElement.animationState.isPlaying = false;
            });
            
            // Change text color to white
            const textSpan = this.querySelector('span');
            if (textSpan) {
                textSpan.style.color = 'white';
                textSpan.style.transition = 'color 0.3s ease';
            }
        });
        
        // Reverse animation on hover off
        buttonElement.addEventListener('mouseleave', function() {
            // Stop current animation
            anim.stop();
            
            // Get current frame
            let currentFrame = anim.currentFrame;
            
            // If animation wasn't playing, start from the end
            if (!this.animationState.isPlaying) {
                currentFrame = anim.totalFrames - 1;
            }
            
            // Set state
            this.animationState.isPlaying = false;
            this.animationState.isReversing = true;
            
            // Play in reverse
            anim.setDirection(-1);
            anim.goToAndPlay(currentFrame, true);
            
            // Ensure animation continues to play and is visible
            setTimeout(function() {
                if (anim && anim.isPaused) {
                    anim.play();
                }
            }, 50);
            
            // Add completion callback with deferred execution to avoid event conflicts
            setTimeout(function() {
                anim.addEventListener('complete', function onComplete() {
                    buttonElement.animationState.isReversing = false;
                    // Remove the event listener after it fires once
                    anim.removeEventListener('complete', onComplete);
                });
            }, 10);
            
            // Reset text color
            const textSpan = this.querySelector('span');
            if (textSpan) {
                textSpan.style.color = '';
            }
        });
    };
});