
/**
 * Enhanced Navigation JavaScript
 * Handles mobile menu, dropdowns, and accessibility
 */

(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
  
  function initNavigation() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-navigation');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const dropdownItems = document.querySelectorAll('.nav-item--dropdown');
    
    if (!mobileToggle || !mainNav) return;
    
    // Mobile menu functionality
    initMobileMenu(mobileToggle, mainNav, mobileOverlay);
    
    // Dropdown functionality
    initDropdowns(dropdownItems);
    
    // Keyboard navigation
    initKeyboardNavigation();
    
    // Close menu on resize if mobile menu is open
    window.addEventListener('resize', handleResize);
    
    // Close menu when clicking outside
    document.addEventListener('click', handleOutsideClick);
  }
  
  function initMobileMenu(toggle, nav, overlay) {
    toggle.addEventListener('click', function() {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        closeMobileMenu(toggle, nav, overlay);
      } else {
        openMobileMenu(toggle, nav, overlay);
      }
    });
    
    // Close menu when overlay is clicked
    if (overlay) {
      overlay.addEventListener('click', function() {
        closeMobileMenu(toggle, nav, overlay);
      });
    }
  }
  
  function openMobileMenu(toggle, nav, overlay) {
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('active');
    if (overlay) overlay.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first nav link
    const firstLink = nav.querySelector('.nav-link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 300);
    }
  }
  
  function closeMobileMenu(toggle, nav, overlay) {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to toggle button
    toggle.focus();
  }
  
  function initDropdowns(dropdownItems) {
    dropdownItems.forEach(function(item) {
      const link = item.querySelector('.nav-link--dropdown');
      const menu = item.querySelector('.dropdown-menu');
      
      if (!link || !menu) return;
      
      // Handle click on dropdown toggle
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('active');
          
          const isExpanded = link.getAttribute('aria-expanded') === 'true';
          link.setAttribute('aria-expanded', !isExpanded);
        }
      });
      
      // Handle keyboard navigation in dropdown
      const dropdownLinks = menu.querySelectorAll('.dropdown-link');
      dropdownLinks.forEach(function(dropdownLink, index) {
        dropdownLink.addEventListener('keydown', function(e) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextLink = dropdownLinks[index + 1];
            if (nextLink) nextLink.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevLink = dropdownLinks[index - 1];
            if (prevLink) {
              prevLink.focus();
            } else {
              link.focus();
            }
          } else if (e.key === 'Escape') {
            link.focus();
          }
        });
      });
    });
  }
  
  function initKeyboardNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link, index) {
      link.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextLink = navLinks[index + 1];
          if (nextLink) nextLink.focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevLink = navLinks[index - 1];
          if (prevLink) prevLink.focus();
        } else if (e.key === 'Escape') {
          const mobileToggle = document.getElementById('mobile-menu-toggle');
          const mainNav = document.getElementById('main-navigation');
          const overlay = document.getElementById('mobile-overlay');
          
          if (mainNav && mainNav.classList.contains('active')) {
            closeMobileMenu(mobileToggle, mainNav, overlay);
          }
        }
      });
    });
  }
  
  function handleResize() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-navigation');
    const overlay = document.getElementById('mobile-overlay');
    
    if (window.innerWidth > 768 && mainNav && mainNav.classList.contains('active')) {
      closeMobileMenu(mobileToggle, mainNav, overlay);
    }
  }
  
  function handleOutsideClick(e) {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-navigation');
    const overlay = document.getElementById('mobile-overlay');
    
    // Close mobile menu if clicking outside
    if (mainNav && mainNav.classList.contains('active')) {
      if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu(mobileToggle, mainNav, overlay);
      }
    }
    
    // Close dropdowns if clicking outside
    const dropdownItems = document.querySelectorAll('.nav-item--dropdown');
    dropdownItems.forEach(function(item) {
      if (!item.contains(e.target)) {
        item.classList.remove('active');
        const link = item.querySelector('.nav-link--dropdown');
        if (link) link.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Smooth scroll for anchor links
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // Close mobile menu if open
          const mobileToggle = document.getElementById('mobile-menu-toggle');
          const mainNav = document.getElementById('main-navigation');
          const overlay = document.getElementById('mobile-overlay');
          
          if (mainNav && mainNav.classList.contains('active')) {
            closeMobileMenu(mobileToggle, mainNav, overlay);
          }
          
          // Smooth scroll to target
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update focus for accessibility
          target.focus();
        }
      });
    });
  }
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Add loading class removal for performance
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
  
})();
