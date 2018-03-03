import * as bootprintOpenapi from 'bootprint-openapi';
import * as bootprint from 'bootprint';

export function doc() {
    return bootprint
        .load(bootprintOpenapi)
        .merge({})
        .build('http://localhost:3030/documentation/json', 'doc')
        .generate()
        .done();
}
