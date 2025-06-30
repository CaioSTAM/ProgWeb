import Handlebars from 'handlebars';

export function registerHelpers() {
  Handlebars.registerHelper('listNodeTechnologies', function (technologies: any[]) {
    let html = '<ul>';
    technologies.forEach((tech) => {
      if (tech.poweredByNodejs) {
        html += `<li>${tech.name} - ${tech.type}</li>`;
      }
    });
    html += '</ul>';
    return new Handlebars.SafeString(html);
  });
}
