# GitHub Pages POC - Acceptance tests

1. On a phone, open the homepage. Confirm the order: Show Us Your Space, Before & After, Clever Spaces, Meet the Maker, footer.
2. Select Show Us Your Space. Demo dialog opens with fields and prototype-only warning.
3. Try submit empty. Browser should require data.
4. Add test name, test email, postcode, project type and description; optionally select up to three JPG/PNG/WebP photos under 10 MB each.
5. Submit. Expect: 'Enquiry journey completed' and 'Nothing was sent or stored.'
6. Close the dialog; navigate to Before & After. Confirm placeholder example is labelled illustrative.
7. Click 'Have something similar in mind?' and confirm the dialogue states which example inspired it.
8. Open Clever Spaces. Follow a category from the homepage; confirm correct anchor section is shown.
9. Verify fixed enquiry action on mobile and right-side prompt on desktop.
10. Confirm all pages and assets load under the GitHub Pages project path.
11. Confirm browser Console has no JavaScript errors and links do not 404.
12. Verify no live Tally ID, personal data or confidential customer images were committed.

POC passes only after mobile and desktop click-through testing, plus a rendered visual check.