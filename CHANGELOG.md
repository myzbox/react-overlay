# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-01-19

### Fixed

- **Overlay Layout**: Fixed critical issue where `width: 100vw` combined with padding caused the overlay to exceed the viewport width, pushing content off-screen.
- **Box Sizing**: Added explicit `box-sizing: border-box` to all structural components (`Modal`, `Overlay`, `Header`, `Footer`, `Content`) to prevent overflow and clipping.
- **Responsive Widths**: Improved modal responsive behavior on small screens using `max-width: 100%`.
- **Variant Styles**: Fixed conflicting styles in `AlertModal` variants.

## [0.1.0] - 2026-01-05

### Added

- **Core Modal**: Accessible, animated, and responsive modal component.
- **Draggable Modals**: Added `draggable` prop to `<Modal />`.
- **Drawer Component**: New `<Drawer />` variant for side panels.
- **Tooltip Component**: New `<Tooltip />` component with customizable positioning.
- **Popover Component**: New `<Popover />` component for interactive content.
- **Toast System**: Full-featured toast notifications (`ToastProvider`, `useToast`) with stacking and positioning.
- **Configurable Headers**: Added `hideHeader` to modals and `showHeader` to alerts.
- **Modal Variants**: Added `<AlertModal />` and `<ConfirmModal />`.
- **Theming**: Implemented CSS Variables for easy color customization.
- **Hooks**: Added `useModal` and `useDraggable` hooks.
