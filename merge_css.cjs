const fs = require('fs');

const frontendCssPath = 'src/styles/index.css';
const backendCssPath = 'backend/resources/css/app.css';

let frontendCss = fs.readFileSync(frontendCssPath, 'utf8');

// Remove @tailwind directives (v3) 
frontendCss = frontendCss.replace(/@tailwind\s+[a-z]+;/g, '');

const backendConfig = `@import 'tailwindcss';

@source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';
@source '../../storage/framework/views/*.php';
@source '../**/*.blade.php';
@source '../**/*.js';

@theme {
    --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol', 'Noto Color Emoji';
}
`;

fs.writeFileSync(backendCssPath, backendConfig + frontendCss);
console.log('Successfully merged CSS into app.css');
