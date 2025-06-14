# Islamic Charity Platform

**بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم**

A transparent, blockchain-based Islamic charity platform built on Solana, featuring Zakat distribution, Halal project funding, and community-driven governance.

## Features

### ✨ Core Features

- **Transparent Charity Requests**: Submit and track charity requests with full transparency
- **Zakat Pool Management**: Community-governed Zakat distribution system
- **Halal Project Funding**: Multi-stage funding for community projects with Islamic compliance
- **Blockchain Integration**: Built on Solana for transparency and efficiency
- **Islamic Design**: Beautiful UI with Arabic typography and Islamic geometric patterns
- **Community Voting**: Democratic decision-making for fund distribution
- **Admin Dashboard**: Comprehensive management tools for platform oversight

### 🕌 Islamic Compliance

- **Sharia-Compliant**: No interest (Riba), transparent transactions
- **Halal Certification**: All projects verified for Islamic compliance
- **Community Benefit**: Focus on collective welfare (Maslaha)
- **Transparency (Amanah)**: Full visibility of fund usage
- **Justice (Adl)**: Fair distribution mechanisms

### 🚀 Technical Features

- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Full type safety
- **Tailwind CSS**: Responsive, Islamic-themed design
- **Solana Web3**: Blockchain integration
- **Wallet Adapters**: Support for multiple Solana wallets
- **Framer Motion**: Smooth animations
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Solana wallet (Phantom, Solflare, etc.)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/islamic-charity-platform.git
cd islamic-charity-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com
NEXT_PUBLIC_CHARITY_TOKEN_ADDRESS=your_token_address
NEXT_PUBLIC_ZAKAT_POOL_ADDRESS=your_zakat_pool_address
NEXT_PUBLIC_ADMIN_WALLETS=wallet1,wallet2
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                          # Next.js 14 App Router
│   ├── page.tsx                 # Homepage
│   ├── dashboard/               # User dashboard
│   ├── create-request/          # Charity request creation
│   ├── halal-projects/          # Halal projects page
│   ├── admin/                   # Admin dashboard
│   └── layout.tsx               # Root layout
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx           # Islamic-themed button
│   │   └── card.tsx             # Card component
│   └── layout/
│       └── navbar.tsx           # Navigation component
├── lib/
│   ├── utils.ts                 # Utility functions
│   ├── solana.ts                # Solana blockchain utils
│   └── wallet-context.tsx       # Wallet context provider
├── types/
│   └── index.ts                 # TypeScript type definitions
└── styles/
    ├── globals.css              # Global styles
    └── islamic-theme.css        # Islamic design system
```

## Key Components

### 🏠 Homepage (`/`)
- Platform statistics and overview
- Featured charity requests
- Success stories and testimonials
- Islamic design with Arabic calligraphy

### 📊 Dashboard (`/dashboard`)
- Personal donation history
- Active requests tracking
- Zakat payments overview
- Community impact metrics

### ➕ Create Request (`/create-request`)
- Multi-step form for charity requests
- Document upload and verification
- Urgency levels and categorization
- Islamic compliance verification

### 🏗️ Halal Projects (`/halal-projects`)
- Community-funded projects
- Multi-stage funding with milestones
- Community voting system
- Progress tracking and updates

### 👨‍💼 Admin Dashboard (`/admin`)
- Request moderation and approval
- Zakat pool management
- User and content management
- Platform analytics and reporting

## Islamic Features

### Zakat Management
- **Automatic Calculation**: Based on Islamic guidelines
- **Community Voting**: Democratic distribution decisions
- **Eligible Recipients**: Verified according to Islamic law
- **Transparent Distribution**: Full blockchain audit trail

### Halal Project Certification
- **Islamic Compliance Check**: All projects verified
- **Community Oversight**: Peer review system
- **Milestone-based Funding**: Gradual release of funds
- **Accountability Measures**: Regular progress reports

### Islamic Design System
- **Arabic Typography**: Proper Arabic font support
- **Islamic Color Palette**: Green, gold, and blue themes
- **Geometric Patterns**: Traditional Islamic motifs
- **Prayer Times Integration**: Local prayer time display

## Blockchain Integration

### Solana Features
- **Fast Transactions**: Low latency, low cost
- **Token Support**: Custom charity tokens
- **Smart Contracts**: Automated fund distribution
- **Wallet Integration**: Multiple wallet support

### Security
- **Multi-signature Wallets**: Admin fund controls
- **Transaction Verification**: Blockchain audit trail
- **Encrypted Data**: Sensitive information protection
- **Access Controls**: Role-based permissions

## Development

### Running Tests
```bash
npm test                 # Run all tests
npm test -- --watch     # Watch mode
npm test -- --coverage  # Coverage report
```

### Building for Production
```bash
npm run build           # Build production version
npm run start           # Start production server
```

### Code Quality
```bash
npm run lint            # ESLint checking
npm run type-check      # TypeScript checking
npm run format          # Prettier formatting
```

## API Routes

### Charity Requests
- `GET /api/requests` - List charity requests
- `POST /api/requests` - Create new request
- `PUT /api/requests/[id]` - Update request
- `DELETE /api/requests/[id]` - Delete request

### Halal Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]/vote` - Vote on project

### Zakat Management
- `GET /api/zakat/pool` - Get pool status
- `POST /api/zakat/distribute` - Create distribution
- `PUT /api/zakat/vote` - Vote on distribution

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/donations` - Donation history

## Deployment

### Environment Setup
1. Configure production environment variables
2. Set up Solana mainnet connection
3. Deploy smart contracts
4. Configure admin wallets

### Vercel Deployment
```bash
npm install -g vercel
vercel
```

### Docker Deployment
```bash
docker build -t islamic-charity .
docker run -p 3000:3000 islamic-charity
```

## Contributing

### Guidelines
1. Follow Islamic principles in all contributions
2. Maintain code quality and test coverage
3. Use conventional commit messages
4. Document new features thoroughly

### Development Process
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## Islamic Principles

### Core Values
- **Transparency (Amanah)**: All transactions visible
- **Justice (Adl)**: Fair distribution of resources
- **Community (Ummah)**: Collective welfare focus
- **Accountability (Taklif)**: Responsible stewardship
- **No Interest (La Riba)**: Interest-free operations

### Compliance
- All financial operations are Sharia-compliant
- Regular audits by Islamic finance experts
- Community oversight and governance
- Educational resources on Islamic charity

## Support

### Getting Help
- 📧 Email: support@islamiccharity.org
- 💬 Discord: [Community Server](https://discord.gg/islamiccharity)
- 📖 Documentation: [docs.islamiccharity.org](https://docs.islamiccharity.org)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/islamic-charity-platform/issues)

### FAQ

**Q: Is this platform Sharia-compliant?**
A: Yes, all operations follow Islamic principles with no interest (Riba) and transparent transactions.

**Q: How is Zakat calculated?**
A: Based on traditional Islamic guidelines: 2.5% of eligible wealth held for one lunar year.

**Q: Can I create my own charity request?**
A: Yes, after connecting your wallet, you can submit requests for community review.

**Q: How are funds distributed?**
A: Through community voting and admin oversight, ensuring fair and Islamic distribution.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Islamic finance principles and scholars
- Solana blockchain technology
- Open source community
- Islamic design inspiration

---

**May Allah accept our efforts and make this platform a means of benefit for the Ummah.**

*"And whoever saves a life, it is as if he has saved all of mankind."* - Quran 5:32
