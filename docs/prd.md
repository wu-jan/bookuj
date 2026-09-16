# Product Requirements Document (PRD) – Direct Booking Concierge MVP

## 1. Business Goal and Context
Create a premier demonstration direct booking showcase interface based on mock data. The application serves as visual and functional validation (Concierge MVP) for prospective hosts seeking independent, commission-free direct booking websites.

## 2. MVP Scope (Phase 1)
- Showcase preview for 10 distinct test properties accessible under dynamic routes `/demo/[slug]`.
- Responsive, mobile-first hero photo gallery.
- Interactive booking calendar with real-time occupancy preview and date-range picker.
- Dynamic pricing breakdown automatically calculated based on selected duration of stay.
- Direct checkout simulation modal (featuring instant digital payment and card settlement options).

## 3. Scope Boundaries (Out of Scope)
- NO user authentication or host accounts required for MVP.
- NO database integration (all state and mock listings reside in `src/data/properties.json`).
- NO production payment gateways (interactive high-fidelity mock simulation only).