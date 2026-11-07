---
version: alpha
name: "Glamping template by 8B"
description: "One-page glamping and remote cabin site in dusk indigo and periwinkle with an ember orange accent, rounded photo windows and frosted cards. Free HTML template by 8B, MIT."
colors:
  primary: "#211c55"
  secondary: "#57547a"
  tertiary: "#f2783f"
  neutral: "#eef0f7"
  surface: "#ffffff"
  on-surface: "#211c55"
  night: "#0d0b27"
  periwinkle: "#b8c1ee"
  dawn-rose: "#e7b6cb"
  indigo: "#323d80"
typography:
  headline-display:
    fontFamily: Gabarito
    fontSize: 150px
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: -0.035em
  headline-lg:
    fontFamily: Gabarito
    fontSize: 92px
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: -0.03em
  name-lg:
    fontFamily: Gabarito
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Gabarito
    fontSize: 23px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.012em
  body-lg:
    fontFamily: Onest
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Onest
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: Onest
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: 0.01em
  button:
    fontFamily: Onest
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.4
rounded:
  window: 44px
  card: 28px
  field: 18px
  pill: 999px
spacing:
  card-gap: 22px
  gutter: 64px
  section-padding: 168px
  max-width: 1320px
  control-height: 52px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 7px 7px 7px 24px
    height: 54px
  button-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 8px 22px
    height: 52px
  card-solid:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card}"
    padding: 26px
  card-frosted:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card}"
    padding: 24px
  input-field:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.field}"
    height: 52px
  menu-panel:
    backgroundColor: "{colors.night}"
    textColor: "{colors.surface}"
    rounded: "{rounded.window}"
---

# Glamping template by 8B

## Overview

A one-page site for a glamping or remote cabin business that rents a handful of stays on a few sites. The idea is one night told in colour: the page opens at dusk, passes through blue hour and firelight to near black, and ends in dawn rose. Photos sit in big rounded windows with thick white borders, and small information lives on cards laid over them. It is calm, nocturnal and photo-led, for guests choosing a special place to sleep outside. The demo names, prices and hosts are invented.

## Colors

Indigo and periwinkle carry the page; ember orange is spent in small amounts.

- **Primary (#211c55):** body text, filled buttons, step discs, the side rail icons, the Firelight moment ground and the text on the rose contact ground.
- **Secondary (#57547a):** lead paragraphs, field labels, captions and secondary card text.
- **Tertiary (#f2783f):** the only accent: round button discs, the sun in the logo mark, arrow strokes, the open question sign and the pledge lines while they burn.
- **Neutral (#eef0f7):** the page ground of the first screen and most sections, and the fill of form fields.
- **Surface (#ffffff):** photo frame borders, solid cards, pill buttons, the current mark in the side rail, the hosts section ground and text on dark grounds.
- **Night (#0d0b27):** the second screen, menu panel, pledge and footer grounds, the Starlight moment and the start of the contact ground.
- **Periwinkle (#b8c1ee):** pledge lines after they switch off, the footer wordmark, the shuttle note band, the status line and muted text on dark.
- **Dawn rose (#e7b6cb):** the Last light and First light moments, the contact ground and the pink glow over the first photo.
- **Indigo (#323d80):** the Blue hour moment ground and the base behind the first photo window.

## Typography

Two Google Fonts families. **Gabarito** is loaded in weight 500 only and is the display face: the first heading (up to 150px, fluid from 56px), section headings (up to 92px, fluid from 42px), ridge and stay names (up to 48px), moment names (up to 80px), card titles at 23px, prices, big figures and the menu links. Lines are tight with negative tracking; nothing is uppercase. **Onest** is the body face in weights 400 to 600: paragraphs at 16px, leads between 17px and 20px, labels and chips at 13px, buttons at 15px weight 500 and form fields. Emphasis comes from size, not weight. Do not add a second display face.

## Layout

Content runs in a 1320px column. The side gutter is fluid from 20px to 64px and sections are padded from 88px to 168px. Most sections open with a two-column header: the heading on the left, a short lead on the right. The first screen is a full-height window with a stay finder pill along its head, a lead and a white card at the left and a frosted card at the right. Ridges share one frame, stays alternate card left and right, hosts are four columns with every second one dropped, and the guestbook is a three-column grid with staggered offsets. Breakpoints sit at 1023px (the side rail goes), 899px (grids drop to one or two columns) and 719px (headers stack, the white first-screen card is hidden, stays and supper stack with cards overlapping the photos, and photo borders thin from 8px to 5px).

## Elevation & Depth

Depth comes from layers rather than heavy shadows. Solid cards and pill buttons carry one soft shadow, 0 26px 60px at minus 26px spread, tinted with the night colour. Frosted cards are 66 percent white with a 1px light border and an 18px backdrop blur. Once scripts run, a cut-out copy of the cabin photo sits in front of the first heading.

## Shapes

Corners are generously round. Photo windows use up to 44px (fluid from 28px) with an 8px white border; cards use up to 28px; form fields 18px; buttons, chips and the rail are pills; icon buttons, the logo mark and host avatars are circles. Hosts are 3:5 tall pills. The logo mark is a circle split by one gap into an ember top and a lower band in the text colour. Photos are cropped to cover.

## Components

- **button-primary:** an indigo pill, 54px high, white 15px label and a 40px ember disc with an arrow at the right. On hover the label rolls down as a copy drops in from above, and the disc turns 45 degrees.
- **button-pill:** a white pill, 52px high, with an ember arrow and the same label roll; used for the brand and the Book a stay buttons in the bar and the menu panel. The menu opens from a round white icon button.
- **card-solid:** a white card with 26px padding, used for the first-screen count card, the supper kitchen, the route card and the booking form.
- **card-frosted:** the translucent card with a blur, used for the first-screen cabin card and the ridge, stay, supper box and guest cards.
- **input-field:** 52px, a 1px indigo border at low opacity, neutral fill, 18px corners; the focus state turns the fill white.
- **menu-panel:** a near-black rounded panel over a dimmed page, with two columns of large Gabarito links.

## Motion

The page loads GSAP 3.13, ScrollTrigger, SplitText and Lenis 1.3 from jsDelivr. The idea is a sky that changes as you scroll: windows open from horizon slits, cards glide across photos and grounds shift from dusk to dawn. Lenis smooths scrolling page-wide.

- **Opening:** on load the heading rises and the controls slide in; the photo drifts and a glow breathes in CSS loops. Over about one screen of scrolling the window widens to full bleed, the controls drift off, the heading sinks behind a cut-out copy of the cabin photo and a night sky photo fades in.
- **Ridges:** pinned for about three screens, each next window opens from a horizon slit while the previous one shrinks and dims.
- **Stays:** each card glides across its photo from the far side as it scrolls into view; on phones it rises instead.
- **Night:** the section ground blends between the five moment colours; each photo rises into place.
- **Supper, getting there, questions:** headings rise line by line and photo windows open from a horizon slit; in supper and getting there the cards also glide in.
- **Hosts:** portraits grow from small circles into tall pills, one after another.
- **Pledge:** each rule burns ember and fades to periwinkle as it crosses the middle of the screen.
- **Guestbook:** cards rise at different speeds by column over a photo that settles from a zoom.
- **Contact:** the ground blends from night to dawn rose and the big heading rises from behind its rule.

Entrances run about 1 to 1.25 seconds with expo easings; scrubbed scenes follow the scroll with a lag of 0.4 to 0.7 seconds. With reduced motion, Lenis, the entrance and scroll animations are off: the ridges stack as plain windows, the heading stays over the photo and the grounds keep their static colours. Hover fills still run and the bar still hides on scroll.

## Do's and Don'ts

- Do keep ember orange small: discs, arrows, the logo sun and burning lines. Don't use it for body text or large fills.
- Do keep photo windows round with the white border; don't use square crops.
- Do set headings in Gabarito 500 with tight tracking; don't add bold or a second display face.
- Do keep the frosted card for text over photos; don't put a solid card where a photo should show through.
- Do let the ground follow the sky from rose through indigo to near black and back; don't add purple gradients.
- Do keep body text at 4.5:1 contrast on its ground, including on the dark sections.
- Do recolour through the `:root` variables, because the scripts read them at run time.
- Don't add stock icons or shadows beyond the single soft one.
