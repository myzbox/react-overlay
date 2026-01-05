# @myzbox/react-overlay

[![npm version](https://img.shields.io/npm/v/@myzbox/react-overlay.svg)](https://www.npmjs.com/package/@myzbox/react-overlay)
[![npm downloads](https://img.shields.io/npm/dm/@myzbox/react-overlay.svg)](https://www.npmjs.com/package/@myzbox/react-overlay)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@myzbox/react-overlay)](https://bundlephobia.com/package/@myzbox/react-overlay)
[![license](https://img.shields.io/npm/l/@myzbox/react-overlay.svg)](https://github.com/myzbox/react-overlay/blob/main/LICENSE)

A highly configurable, accessible, and senior-grade React overlay library. Built with TypeScript, Accessibility, and Performance in mind.

## Features

- 🎯 **Accessible**: Fully compliant with WAI-ARIA practices (focus trapping, aria attributes, keyboard navigation).
- 🎨 **Animations**: Built-in animations (Zoom, Fade, Slide Up/Down/Left/Right).
- 📱 **Responsive**: Mobile-friendly out of the box.
- 🖐 **Draggable**: Enable drag-and-drop support on modals.
- 🗄️ **Drawer Component**: Slide-out panels from any edge (Left, Right, Top, Bottom).
- 💡 **Tooltip Component**: Customizable tooltips with support for HTML content.
- 💬 **Popover Component**: Click-triggered interactive popups.
- 🍞 **Toast System**: Global notifications with stacking, positioning, and auto-close.
- 🌈 **Themable**: Configurable colors via CSS Variables.
- 🧩 **Variants**: Includes `AlertModal`, `ConfirmModal`, `Drawer`, `Tooltip`, `Popover`, and `Toast`.
- 🛠 **Customizable**: Extensive props for specific positioning, sizing, and styling.
- 📦 **Lightweight**: Minimal dependencies (`classnames`, `react`, `react-dom`).

## Installation

```bash
npm install @myzbox/react-overlay
# or
yarn add @myzbox/react-overlay
```

Ensure you have peer dependencies installed:
```bash
npm install react react-dom
```

## Basic Usage

```tsx
// Complete bundle (Recommended)
import '@myzbox/react-overlay/dist/react-overlay.css';

// OR import all source modules at once
import '@myzbox/react-overlay/styles/index.css';



// 1. Wrap your app with ToastProvider
import { ToastProvider } from '@myzbox/react-overlay';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <App />
  </ToastProvider>
);
```

### `<Modal />`

```tsx
import React, { useState } from 'react';
import { Modal, useModal } from '@myzbox/react-overlay';

const App = () => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <button onClick={open}>Open Modal</button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={close} 
        title="Welcome"
        position="center"
        animation="zoom"
        draggable // Enable drag
      >
        <p>This is a custom accessible modal.</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
             <button onClick={close}>Close</button>
        </div>
      </Modal>
    </>
  );
};
```

### `<Tooltip />`

```tsx
import { Tooltip } from '@myzbox/react-overlay';

<Tooltip content="I am a simple tooltip" position="top">
  <button>Hover me</button>
</Tooltip>

// With HTML content and custom width
<Tooltip 
  content={<strong>Bold content</strong>} 
  width={200}
  position="right"
>
  <button>HTML Tooltip</button>
</Tooltip>
```

### `<AlertModal />` - Simple Alerts

```tsx
import { AlertModal, useModal } from '@myzbox/react-overlay';

const App = () => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <button onClick={open}>Show Success Alert</button>
      
      <AlertModal
        isOpen={isOpen}
        onClose={close}
        type="success"  // 'success' | 'error' | 'warning' | 'info'
        message="Your changes have been saved successfully!"
        okText="Got it"
        onOk={() => console.log('OK clicked')}
      />
    </>
  );
};
```

### `<ConfirmModal />` - Confirmation Dialogs

```tsx
import { ConfirmModal, useModal } from '@myzbox/react-overlay';

const App = () => {
  const { isOpen, open, close } = useModal();

  const handleDelete = async () => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Deleted!');
  };

  return (
    <>
      <button onClick={open}>Delete Item</button>
      
      <ConfirmModal
        isOpen={isOpen}
        onClose={close}
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}  // Red button for dangerous actions
        onConfirm={handleDelete}  // Supports async functions
        onCancel={() => console.log('Cancelled')}
      />
    </>
  );
};
```

### `<Drawer />` - Side Panels

```tsx
import { Drawer, useModal } from '@myzbox/react-overlay';

const App = () => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <button onClick={open}>Open Settings</button>
      
      <Drawer
        isOpen={isOpen}
        onClose={close}
        placement="right"  // 'left' | 'right' | 'top' | 'bottom'
        title="Settings"
      >
        <div>
          <h3>Account Settings</h3>
          <p>Configure your preferences here...</p>
        </div>
      </Drawer>
    </>
  );
};
```

### `<Tooltip />` - Contextual Help

```tsx
import { Tooltip } from '@myzbox/react-overlay';

// Simple text tooltip
<Tooltip content="Click to copy to clipboard" position="top">
  <button>Copy</button>
</Tooltip>

// Rich HTML content
<Tooltip 
  content={
    <div>
      <strong>Pro Tip:</strong>
      <p>Hold Shift to select multiple items</p>
    </div>
  }
  position="right"
  delay={300}
  width={250}
>
  <span>ℹ️ Help</span>
</Tooltip>

// Icon with tooltip
<Tooltip content="This is a multi-line tooltip that provides detailed information about the feature">
  <button>🔍</button>
</Tooltip>
```

### `<Popover />` - Interactive Menus

```tsx
import { Popover } from '@myzbox/react-overlay';

// Simple content
<Popover content="Quick info here" position="bottom">
  <button>Click Me</button>
</Popover>

// Interactive menu with render prop
<Popover 
  content={(close) => (
    <div style={{ padding: '1rem' }}>
      <h4>Actions</h4>
      <button onClick={() => { console.log('Edit'); close(); }}>
        Edit
      </button>
      <button onClick={() => { console.log('Delete'); close(); }}>
        Delete
      </button>
      <button onClick={close}>Cancel</button>
    </div>
  )}
  position="bottom"
  width={200}
  draggable  // Make it draggable
>
  <button>⋮ More Options</button>
</Popover>
```

### `useToast()` - Global Notifications

```tsx
import { useToast, ToastProvider } from '@myzbox/react-overlay';

// Wrap your app with ToastProvider first
function Root() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}

function App() {
  const toast = useToast();

  const showNotifications = () => {
    // Simple usage
    toast.success("Saved successfully!");
    toast.error("Failed to save");
    toast.warning("Please review your changes");
    toast.info("New update available");

    // Advanced with options
    toast.success("File uploaded", {
      position: "top-right",    // 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
      duration: 5000,           // milliseconds (0 = never auto-close)
      delay: 500,               // delay before showing
      draggable: true           // allow dragging
    });

    // Manual close (persist until user closes)
    toast.info("Processing your request...", { duration: 0 });
  };

  return <button onClick={showNotifications}>Show Toasts</button>;
}
```

### Advanced: Draggable Modals

```tsx
import { Modal, useModal } from '@myzbox/react-overlay';

const App = () => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <button onClick={open}>Open Draggable Modal</button>
      
      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Drag me around!"
        draggable={true}  // Enable dragging
        position="center"
        animation="zoom"
      >
        <p>You can drag this modal by its header!</p>
      </Modal>
    </>
  );
};
```

### `useToast()`

```tsx
import { useToast } from '@myzbox/react-overlay';

const MyComponent = () => {
  const toast = useToast();

  const handleClick = () => {
    // Simple
    toast.success("Operation saved!");

    // Advanced
    toast.error("Network Error", {
      position: "bottom-right",
      duration: 5000,
      delay: 500, // Wait 500ms before showing
    });
    
    // Manual Close / Persistent
    toast.info("Updating...", { duration: 0 }); // 0 = never close automatically
  };

  return <button onClick={handleClick}>Show Toast</button>;
};
```

## Theming & Customization

Define these variables in your CSS (e.g., `:root`) to override default colors:

```css
:root {
  /* Modal Backgrounds */
  --rm-overlay-bg: rgba(0, 0, 0, 0.5);
  --rm-modal-bg: #ffffff;
  
  /* Text & Borders */
  --rm-text-color: #374151;
  --rm-title-color: #111827;
  --rm-border-color: #e5e7eb;
  
  /* Buttons */
  --rm-btn-primary-bg: #2563eb;
  --rm-btn-primary-hover: #1d4ed8;
  --rm-btn-primary-text: #ffffff;
  
  --rm-btn-destructive-bg: #dc2626;
  --rm-btn-destructive-hover: #b91c1c;
}
```

## Components API

### `<Modal />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | required | Controls visibility |
| `onClose` | function | required | Callback when requesting close |
| `children` | ReactNode | required | Content of the modal |
| `draggable` | boolean | `false` | Enable drag functionality |
| `position` | 'center', 'top', etc. | 'center' | Position on screen |
| `size` | 'sm', 'md', 'lg', 'xl', 'full' | 'md' | Width size preset |
| `animation` | 'zoom', 'fade', 'slide-up'... | 'zoom' | Entry/Exit animation |
| `hideHeader` | boolean | `false` | Hides the header (title/close btn) |

### `<AlertModal />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | 'success', 'error', 'warning', 'info' | 'info' | Visual style/icon |
| `message` | ReactNode | required | Alert content |
| `showHeader` | boolean | `true` | Show/Hide the header |
| `onOk` | function | - | Callback for OK button |

### `<Tooltip />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | required | Trigger element |
| `content` | ReactNode | required | content of tooltip |
| `position` | 'top', 'bottom', 'left', 'right' | 'top' | Position relative to trigger |
| `delay` | number | 200 | Delay in ms before showing |
| `width` | string/number | - | Custom width |
| `height` | string/number | - | Custom height |

### `<Popover />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | required | Trigger element (clickable) |
| `content` | ReactNode | required | Content of the popover |
| `position` | 'top', 'bottom', 'left', 'right' | 'bottom' | Position relative to trigger |
| `width` | string/number | - | Custom width |

## Community

- [Changelog](./CHANGELOG.md)
- [Roadmap](./ROADMAP.md)
- [Contributing](./CONTRIBUTING.md)

## 🤝 Contributing

Contributions are welcome!

Please read CONTRIBUTING.md before submitting a pull request.

## 👤 Maintainer

**Maintainer:** Mahantesh Teli  
**Email:** myzbox1@gmail.com  
**Organization:** myZbox


For questions, bug reports, or feature requests, please open an issue.
Direct emails are recommended only for security or private concerns.

## 📄 License

MIT © 2025 myzbox

## ⭐ Support

If this library helps you:

Star the repository ⭐

Share feedback

Open issues for bugs or feature requests

---