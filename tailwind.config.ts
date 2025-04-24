import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		fontFamily: {
			sans: ['Poppins', 'Lato', 'sans-serif'],
			poppins: ['Poppins', 'sans-serif'],
			lato: ['Lato', 'sans-serif'],
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Growbit zen theme colors
				zen: {
					mint: '#C8E6C9',
					beige: '#F5F5DC',
					blue: '#BBDEFB',
					lightGray: '#F5F5F5',
					darkGray: '#757575'
				},
				growbit: {
					primary: '#4CAF50',    // Green for primary actions
					secondary: '#BBDEFB',  // Light blue for secondary elements
					accent: '#FFC107',     // Amber for accents/highlights
					success: '#81C784',    // Lighter green for success states
					warning: '#FFB74D',    // Orange for warnings
					error: '#E57373',      // Light red for errors
					background: '#FAFAFA', // Almost white background
					card: '#FFFFFF',       // White card background
					text: {
						primary: '#424242',   // Dark gray for primary text
						secondary: '#757575', // Medium gray for secondary text
						disabled: '#BDBDBD',  // Light gray for disabled text
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)'
					},
					'50%': { 
						opacity: '0.8', 
						boxShadow: '0 0 20px 10px rgba(76, 175, 80, 0.3)' 
					}
				},
				'bounce-small': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'sparkle': {
					'0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
					'50%': { transform: 'scale(1) rotate(90deg)', opacity: '1' },
					'100%': { transform: 'scale(0) rotate(180deg)', opacity: '0' }
				},
				'spin-once': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'shake-soft': {
					'0%, 100%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-5px)' },
					'75%': { transform: 'translateX(5px)' }
				},
				'slide-in-bottom': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'scale-fade-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'ripple': {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'100%': { transform: 'scale(4)', opacity: '0' }
				},
				'blob-move': {
					'0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
					'25%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
					'50%': { borderRadius: '40% 60% 60% 40%/60% 40% 60% 40%' },
					'75%': { borderRadius: '40% 60% 70% 30%/40% 40% 70% 60%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'bounce-small': 'bounce-small 2s ease-in-out infinite',
				'sparkle': 'sparkle 0.8s ease-in-out forwards',
				'spin-once': 'spin-once 0.8s ease-in-out',
				'shake-soft': 'shake-soft 0.5s ease-in-out',
				'slide-in-bottom': 'slide-in-bottom 0.4s ease-out',
				'scale-fade-in': 'scale-fade-in 0.3s ease-out',
				'ripple': 'ripple 0.8s ease-out',
				'blob-move': 'blob-move 25s ease-in-out infinite',
				// Combined animations
				'check-complete': 'scale-fade-in 0.3s ease-out, sparkle 0.8s ease-in-out forwards',
				'badge-earned': 'float 0.6s ease-out, spin-once 0.8s ease-in-out',
				'streak-break': 'shake-soft 0.5s ease-in-out',
				'leaderboard-climb': 'bounce-small 0.6s ease-out, pulse-glow 1s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
