/**
 * =============================================================================
 * Contact Controller Tests
 * =============================================================================
 * SDLC Phase: Testing & QA - validation testing
 * 
 * These tests verify the contact form validation logic.
 * =============================================================================
 */

const { validateFormData } = require('../../src/controllers/contactController');

describe('Contact Controller', () => {
    describe('validateFormData', () => {
        it('should validate correct form data', () => {
            const validData = {
                name: 'John Doe',
                email: 'john@example.com',
                whatsapp: '+919876543210',
                message: 'I am interested in the bootcamp!'
            };

            const result = validateFormData(validData);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should reject empty name', () => {
            const invalidData = {
                name: '',
                email: 'john@example.com',
                whatsapp: '+919876543210',
                message: 'I am interested in the bootcamp!'
            };

            const result = validateFormData(invalidData);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Name is required (minimum 2 characters)');
        });

        it('should reject invalid email', () => {
            const invalidData = {
                name: 'John Doe',
                email: 'not-an-email',
                whatsapp: '+919876543210',
                message: 'I am interested in the bootcamp!'
            };

            const result = validateFormData(invalidData);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Valid email is required');
        });

        it('should reject short message', () => {
            const invalidData = {
                name: 'John Doe',
                email: 'john@example.com',
                whatsapp: '+919876543210',
                message: 'Hi'
            };

            const result = validateFormData(invalidData);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Message is required (minimum 10 characters)');
        });

        it('should collect multiple errors', () => {
            const invalidData = {
                name: '',
                email: 'invalid',
                whatsapp: '123',
                message: 'short'
            };

            const result = validateFormData(invalidData);
            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThan(1);
        });
    });
});
