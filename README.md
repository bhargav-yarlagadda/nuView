# Lumina 🚀

A sophisticated AI-powered web development platform built with Next.js 15, TypeScript, and modern web technologies. Lumina enables developers to describe their desired web components or features in natural language, and the AI system generates interactive code fragments with live previews in real-time.

## 🎯 What is Lumina?

Lumina is an intelligent coding assistant that transforms natural language descriptions into working web applications. It's designed for developers, designers, and anyone who wants to quickly prototype web interfaces without writing code from scratch.

### Core Concept
1. **User Input**: Describe what you want to build (e.g., "Create an animated hero section with a dark mode toggle")
2. **AI Processing**: The system uses GPT-4.1 with specialized tools to generate code
3. **Live Preview**: Generated code runs in isolated sandboxes with real-time updates
4. **Code Management**: View, edit, and manage generated code files through an intuitive interface

## ✨ Key Features

- **🤖 AI-Powered Code Generation**: GPT-4.1 powered coding agent with specialized tools
- **🏗️ Interactive Project Management**: Create and manage multiple development projects
- **👁️ Live Code Preview**: Real-time preview of generated code in isolated sandboxes
- **📁 Advanced File Management**: Hierarchical file tree with syntax highlighting
- **💬 Real-time Messaging**: Chat-based interface for iterative development
- **🎨 Modern UI Components**: Built with Radix UI and Tailwind CSS v4
- **🔄 Background Job Processing**: Inngest for handling async AI tasks
- **📱 Responsive Design**: Mobile-first approach with adaptive layouts
- **🔒 Sandboxed Execution**: Secure code execution in isolated environments
- **📊 Code Analysis**: Syntax highlighting, file organization, and code exploration

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: TanStack Query (React Query) + tRPC
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Animations**: Custom CSS animations and transitions

### Backend & Infrastructure
- **Database**: PostgreSQL with Prisma ORM
- **API Layer**: tRPC for type-safe API calls
- **Background Jobs**: Inngest for async task processing
- **Code Execution**: E2B Code Interpreter for sandboxed environments
- **AI Integration**: OpenAI GPT-4.1 with custom agent framework
- **Authentication**: NextAuth.js (configured but not fully implemented)

### Development Tools
- **Package Manager**: npm/yarn/pnpm/bun support
- **Linting**: ESLint with Next.js configuration
- **Code Formatting**: Prettier (implied)
- **Type Checking**: TypeScript strict mode
- **Hot Reload**: Next.js development server with Turbopack


## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **PostgreSQL**: 12+ with database access
- **Package Manager**: npm, yarn, pnpm, or bun
- **Git**: For version control
- **Environment Variables**: API keys for external services

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Lumina
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

   ```env
   # Database Configuration (REQUIRED)
   DATABASE_URL="postgresql://username:password@localhost:5432/nuview_db"
   
   # Next.js Configuration (REQUIRED)
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # E2B Configuration (REQUIRED for code execution)
   E2B_API_KEY="your-e2b-api-key"
   
   # Inngest Configuration (REQUIRED for background jobs)
   INNGEST_EVENT_KEY="your-inngest-event-key"
   INNGEST_SIGNING_KEY="your-inngest-signing-key"
   
   # OpenAI Configuration (REQUIRED for AI features)
   OPENAI_API_KEY="your-openai-api-key"
   
   # Sandbox Configuration (OPTIONAL)
   SANDBOX_NAME="Lumina"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # (Optional) View database in Prisma Studio
   npx prisma studio
   ```

5. **Start Development Servers**

   **Terminal 1: Next.js Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   **Terminal 2: Inngest Development Server (REQUIRED)**
   ```bash
   npx inngest-cli@latest dev
   ```

6. **Access the Application**
   - **Main App**: [http://localhost:3000](http://localhost:3000)
   - **Inngest Dashboard**: [http://localhost:8288](http://localhost:8288)

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server with Turbopack |
| `npm run build` | Build application for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npx inngest-cli@latest dev` | Start Inngest development server |

## 🌐 Environment Variables

### Required Variables

| Variable | Description | Example | Purpose |
|----------|-------------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` | Database connectivity |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js | `your-secret-key-here` | Authentication security |
| `NEXTAUTH_URL` | Base URL of your application | `http://localhost:3000` | Authentication redirects |
| `E2B_API_KEY` | API key for E2B code interpreter | `your-e2b-api-key` | Sandboxed code execution |
| `INNGEST_EVENT_KEY` | Inngest event key | `your-inngest-event-key` | Background job events |
| `INNGEST_SIGNING_KEY` | Inngest signing key | `your-inngest-signing-key` | Webhook security |
| `OPENAI_API_KEY` | OpenAI API key | `your-openai-api-key` | AI code generation |

### Optional Variables

| Variable | Description | Default | Purpose |
|----------|-------------|---------|---------|
| `SANDBOX_NAME` | E2B sandbox identifier | `Lumina` | Sandbox naming |
| `NEXT_PUBLIC_APP_URL` | Public app URL | `http://localhost:3000` | Client-side API calls |

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Here's the complete data model:

### Core Models

```prisma
model Project {
  id        String    @id @default(uuid())
  name      String    // Auto-generated slug
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  messages  Message[] // One-to-many relationship
}

model Message {
  id        String      @id @default(uuid())
  content   String      // Message text content
  role      MessageRole // USER or ASSISTANT
  type      MessageType // RESULT or ERROR
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  fragment  Fragment?   // Optional code fragment
  projectId String      // Foreign key to Project
  project  Project      @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model Fragment {
  id         String   @id @default(uuid())
  messageId  String   @unique // One-to-one with Message
  sandboxUrl String   // Live preview URL
  title      String   // Fragment title
  files      Json     // Generated code files
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  message    Message  @relation(fields: [messageId], references: [id], onDelete: Cascade)
}

enum MessageRole {
  USER
  ASSISTANT
}

enum MessageType {
  RESULT
  ERROR
}
```

## 🏗️ Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── (home)/                   # Home page route group
│   │   ├── layout.tsx           # Home page layout with background
│   │   └── page.tsx             # Home page component
│   ├── api/                      # API routes
│   │   ├── inngest/             # Inngest webhook endpoint
│   │   └── trpc/                # tRPC API endpoint
│   ├── project/                  # Project view routes
│   │   └── [projectId]/         # Dynamic project route
│   │       └── page.tsx         # Project view page
│   ├── favicon.ico              # App icon
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Root page
├── components/                   # Reusable UI components
│   ├── common/                  # Common components
│   │   └── Footer.tsx          # Footer component
│   └── ui/                     # Shadcn/UI components
│       ├── accordion.tsx        # Accordion component
│       ├── button.tsx          # Button component
│       ├── dialog.tsx          # Dialog component
│       └── ...                 # 40+ other UI components
├── generated/                   # Generated files
│   └── prisma/                 # Prisma client
├── hooks/                      # Custom React hooks
│   └── use-mobile.ts          # Mobile detection hook
├── inngest/                    # Background job system
│   ├── client.ts              # Inngest client configuration
│   ├── function.ts            # Main AI coding function
│   ├── prompts.ts             # AI system prompts
│   └── utils.ts               # Inngest utility functions
├── lib/                       # Utility libraries
│   ├── prisma.ts             # Prisma client instance
│   └── utils.ts              # Utility functions
├── modules/                   # Feature-based modules
│   ├── home/                 # Home page functionality
│   │   ├── UI/              # Home page components
│   │   │   ├── ProjectForm.tsx    # Project creation form
│   │   │   └── TypeWriter.tsx     # Animated text component
│   │   └── view/            # Home page view
│   │       └── HomePage.tsx       # Main home page
│   ├── message/              # Messaging system
│   │   └── server/           # Message server procedures
│   │       └── procedures.ts      # Message CRUD operations
│   └── projects/             # Project management
│       ├── server/           # Project server procedures
│       │   └── procedures.ts      # Project CRUD operations
│       └── UI/               # Project UI components
│           ├── components/    # Project-specific components
│           │   ├── code/      # Code-related components
│           │   │   ├── CodePanel.tsx      # Syntax highlighting
│           │   │   ├── FileExplorer.tsx   # File tree and code view
│           │   │   ├── FileTree.tsx       # Hierarchical file tree
│           │   │   └── code-theme.css     # Code syntax theme
│           │   ├── FragmentWeb.tsx        # Live preview iframe
│           │   ├── FragmentWebPlaceHolder.tsx # Empty state
│           │   ├── Hint.tsx               # Tooltip component
│           │   ├── Loader.tsx             # Loading component
│           │   ├── message-form.tsx       # Message input form
│           │   ├── MessageCard.tsx        # Individual message display
│           │   ├── MessageLoader.tsx      # Message loading state
│           │   ├── MessagesContainer.tsx  # Messages list container
│           │   └── ProjectHeader.tsx      # Project header
│           └── views/         # Project view components
│               └── project-view.tsx       # Main project view
├── trpc/                     # tRPC configuration
│   ├── init.ts              # tRPC initialization
│   ├── query-client.ts      # React Query client
│   ├── routers/             # API route definitions
│   │   └── _app.ts          # Main router configuration
│   └── tRPC-wrapper.tsx     # React provider wrapper
└── server.tsx               # Server-side utilities
```

## 🔌 API Architecture

### tRPC API Endpoints

The application uses tRPC for type-safe API communication between client and server.

#### Project Routes (`/api/trpc/projects.*`)
- **`create`**: Create new project with initial message
- **`getOneProject`**: Fetch single project by ID
- **`getProjects`**: Fetch all projects (ordered by update time)

#### Message Routes (`/api/trpc/messages.*`)
- **`create`**: Create new message in project
- **`getMessages`**: Fetch all messages for a project

### Inngest Background Jobs

The system uses Inngest for handling asynchronous AI coding tasks:

#### Main Function: `hello-world`
- **Trigger**: `test/hello.world` event
- **Purpose**: AI-powered code generation
- **Process**:
  1. Creates E2B sandbox environment
  2. Initializes AI coding agent with specialized tools
  3. Processes user request through AI network
  4. Generates and saves code files
  5. Creates live preview sandbox
  6. Saves results to database

#### AI Agent Tools
- **`terminal`**: Execute shell commands in sandbox
- **`createOrUpdateFiles`**: Write/update code files
- **`readFiles`**: Read existing file contents

## 🧠 AI System Architecture

### AI Agent Framework
The system uses a sophisticated AI agent framework built with Inngest Agent Kit:

1. **Agent Creation**: GPT-4.1 powered coding agent
2. **Tool Integration**: Custom tools for file operations and terminal access
3. **Network Orchestration**: Multi-iteration agent network for complex tasks
4. **State Management**: Persistent state across agent iterations
5. **Response Processing**: Structured output with task summaries

### System Prompts
The AI system uses carefully crafted prompts that:
- Define the coding environment and constraints
- Specify file safety rules and best practices
- Enforce responsive design requirements
- Ensure production-quality code output
- Maintain consistent coding standards

### Code Generation Process
1. **User Input**: Natural language description
2. **AI Analysis**: Understanding requirements and constraints
3. **Tool Execution**: File creation, package installation, code writing
4. **Iteration**: Multiple passes for complex features
5. **Validation**: Code testing and verification
6. **Output**: Working application with live preview

## 🎨 UI/UX Design System

### Design Principles
- **Mobile-First**: Responsive design starting from mobile breakpoints
- **Dark Mode**: Default dark theme with system preference support
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Optimized rendering with React best practices
- **Consistency**: Unified design language across all components

### Component Architecture
- **Atomic Design**: Building blocks from atoms to organisms
- **Composition**: Flexible component composition patterns
- **Variants**: Consistent component variants and states
- **Theming**: CSS custom properties for dynamic theming
- **Responsiveness**: Breakpoint-based responsive utilities

### Key UI Components
- **Resizable Panels**: Adjustable layout panels for code and preview
- **File Tree**: Hierarchical file organization with visual indicators
- **Code Editor**: Syntax-highlighted code viewing with Prism.js
- **Message Interface**: Chat-like interface for project communication
- **Preview Frame**: Live iframe preview of generated applications

## 🔄 Data Flow & State Management

### Client-Side State
- **React Query**: Server state management with caching
- **Local State**: Component-specific state with useState
- **Form State**: Form management with React Hook Form
- **Theme State**: Dark/light mode with next-themes

### Server-Side State
- **Database**: PostgreSQL with Prisma ORM
- **Background Jobs**: Inngest for async task processing
- **File Storage**: E2B sandbox for temporary code storage
- **Session Management**: NextAuth.js for authentication

### Real-time Updates
- **Polling**: 5-second intervals for message updates
- **Optimistic Updates**: Immediate UI feedback for user actions
- **Background Sync**: Inngest job status monitoring
- **Live Preview**: Real-time sandbox updates

## 🚀 Deployment

### Production Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:pass@host:port/database"

# Authentication
NEXTAUTH_SECRET="production-secret-key"
NEXTAUTH_URL="https://yourdomain.com"

# AI Services
E2B_API_KEY="production-e2b-key"
OPENAI_API_KEY="production-openai-key"

# Background Jobs
INNGEST_EVENT_KEY="production-inngest-key"
INNGEST_SIGNING_KEY="production-inngest-signing-key"

# App Configuration
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### Deployment Platforms

#### Vercel (Recommended)
1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically on push
4. Monitor Inngest functions

#### Other Platforms
- **Netlify**: Static export with API routes
- **Railway**: Full-stack deployment
- **DigitalOcean**: App Platform deployment
- **AWS**: Amplify or ECS deployment

### Inngest Production Setup
1. **Self-Hosted**: Deploy Inngest server
2. **Cloud**: Use Inngest Cloud service
3. **Monitoring**: Set up alerts and logging
4. **Scaling**: Configure auto-scaling policies

## 🔧 Development Workflow

### Local Development
1. **Start Services**: Next.js + Inngest + PostgreSQL
2. **Environment**: Configure local environment variables
3. **Database**: Use local PostgreSQL instance
4. **AI Testing**: Use development API keys
5. **Hot Reload**: Next.js development server

### Code Quality
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting (implied)
- **Testing**: Component and integration tests (recommended)

### Git Workflow
1. **Feature Branches**: Create for new features
2. **Commit Messages**: Conventional commit format
3. **Pull Requests**: Code review and testing
4. **Deployment**: Automatic deployment on merge

## 🐛 Troubleshooting

### Common Issues

#### Inngest Server Not Starting
```bash
# Check if Inngest CLI is installed
npm install -g @inngest/cli

# Start development server
npx inngest-cli@latest dev
```

#### Database Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Verify connection string
npx prisma db pull

# Reset database
npx prisma db push --force-reset
```

#### AI Generation Failing
- Verify OpenAI API key
- Check E2B API key and quotas
- Monitor Inngest function logs
- Verify environment variables

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma client
npx prisma generate
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# Inngest debug mode
INNGEST_DEV=true npx inngest-cli@latest dev
```

## 📚 API Reference

### tRPC Procedures

#### Projects
```typescript
// Create project
trpc.projects.create.mutate({ value: "Create a todo app" })

// Get project
trpc.projects.getOneProject.query({ id: "project-id" })

// List projects
trpc.projects.getProjects.query()
```

#### Messages
```typescript
// Create message
trpc.messages.create.mutate({ 
  value: "Add dark mode", 
  projectId: "project-id" 
})

// Get messages
trpc.messages.getMessages.query({ projectId: "project-id" })
```

### Inngest Functions

#### Event Schema
```typescript
{
  name: "test/hello.world",
  data: {
    value: string,        // User request
    projectId: string     // Project identifier
  }
}
```

#### Function Response
```typescript
{
  url: string,           // Sandbox preview URL
  title: string,         // Fragment title
  files: Record<string, string>, // Generated code files
  summary: string        // AI task summary
}
```

## 🔮 Future Roadmap

### Planned Features
- [ ] **Enhanced AI Models**: Support for multiple AI providers
- [ ] **Collaborative Editing**: Real-time collaborative development
- [ ] **Version Control**: Git integration for code history
- [ ] **Template Library**: Pre-built component templates
- [ ] **Performance Analytics**: Code performance metrics
- [ ] **Team Management**: Multi-user project collaboration
- [ ] **Advanced Preview**: Interactive preview with dev tools
- [ ] **Export Options**: Multiple export formats (React, Vue, etc.)

### Technical Improvements
- [ ] **Microservices**: Break down into smaller services
- [ ] **Real-time Updates**: WebSocket integration
- [ ] **Caching Layer**: Redis for performance optimization
- [ ] **Monitoring**: Comprehensive logging and metrics
- [ ] **Security**: Enhanced sandbox security
- [ ] **Testing**: Comprehensive test coverage

## 🤝 Contributing

### Development Setup
1. **Fork Repository**: Create your fork
2. **Clone**: `git clone <your-fork-url>`
3. **Install**: `npm install`
4. **Environment**: Copy `.env.example` to `.env.local`
5. **Database**: Set up local PostgreSQL
6. **Start**: Run development servers

### Contribution Guidelines
- **Code Style**: Follow existing patterns
- **TypeScript**: Use strict typing
- **Testing**: Add tests for new features
- **Documentation**: Update docs for changes
- **Commits**: Use conventional commit format

### Pull Request Process
1. **Create Branch**: `git checkout -b feature/amazing-feature`
2. **Make Changes**: Implement your feature
3. **Test**: Ensure all tests pass
4. **Commit**: `git commit -m 'feat: add amazing feature'`
5. **Push**: `git push origin feature/amazing-feature`
6. **Submit PR**: Create pull request with description

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Community

### Getting Help
1. **Documentation**: Check this README first
2. **Issues**: Search existing GitHub issues
3. **Discussions**: Use GitHub Discussions
4. **Discord**: Join our community server (if available)

### Reporting Issues
When reporting issues, please include:
- **Environment**: OS, Node.js version, package manager
- **Steps**: Detailed reproduction steps
- **Expected**: What should happen
- **Actual**: What actually happens
- **Logs**: Relevant error logs and stack traces

### Feature Requests
- **Use Cases**: Describe your use case
- **Benefits**: Explain the benefits
- **Alternatives**: Consider existing solutions
- **Implementation**: Suggest implementation approach

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Vercel**: For deployment and hosting
- **Prisma**: For database tooling
- **Inngest**: For background job processing
- **E2B**: For sandboxed code execution
- **OpenAI**: For AI capabilities
- **Shadcn**: For UI component library
- **Tailwind CSS**: For utility-first CSS framework

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**

*Lumina - Transform your ideas into stunning websites with AI-powered development.*
