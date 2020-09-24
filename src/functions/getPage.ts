export default (target, pages) => pages.find(page => page.slug === target.replace('.forestry/content/pages/', '').replace('.json', ''))
