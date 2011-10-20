/*
schnipp forms - rockit
*/
schnipp.forms = {};

/*
renders a field in a container div with label and stuff
*/
schnipp.forms.render_field = function(field_descriptor, rendered_field, errorlist) {
    var outer = $('<div><span class="label">' + field_descriptor.label + ' : </span></div>');
    //outer.prepend(errorlist);
    outer.append(rendered_field);
    return outer;
};

/*
TODO is this needed?
*/
schnipp.forms.renderer = function(schema, data) {
    var res = $('<div></div>');
    for (var i = 0; i < schema.fields.length; i++) {
        var field_schema = schema.fields[i];
        var field = schnipp.forms.fields[field_schema.type](field_schema, data[field_schema.name]);
        res.append(field.render());
    }
    return res;
};

/*
the schnippform
give me a schema and some data - i will be your form
*/
schnipp.forms.form = function(schema, data) {
    var self = {};
    
    self.schema = schema;
    self.data = data;
    self.fields = {};
    
    /* render the form */
    self.render = function() {
        var res = $('<div id="form_' + self.schema.name + '"></div>');
        for (var i = 0; i < self.schema.fields.length; i++) {
            var field_schema = schema.fields[i];
            var field = schnipp.forms.fields[field_schema.type](field_schema, data[field_schema.name]);
            self.fields[field_schema.name] = field;
            res.append(field.render());
        }
        return res;
    };
    
    /* extract current data */
    self.get_data = function() {
        var data = {};
        for (var i = 0; i < self.schema.fields.length; i++) {
            var field_schema = schema.fields[i];
            var field = self.fields[field_schema.name];
            data[field_schema.name] = field.get_data();
        }
        return data;
    };

    /* run form validation */
    self.do_validate = function() {
        var data = {};
        for (var i = 0; i < self.schema.fields.length; i++) {
            var field_schema = schema.fields[i];
            var field = self.fields[field_schema.name];
            data[field_schema.name] = field.do_validate();
        }
        return data;
    };

    /* fill in new data in the form */
    self.set_data = function(data) {
        for (var i = 0; i < self.schema.fields.length; i++) {
            var field_schema = schema.fields[i];
            var field = self.fields[field_schema.name];
            field.set_data(data[field_schema.name] || field_schema.default_value);
        }
    };
    
    /* initialize the form after rendering it */
    self.initialize = function(data) {
        for (var i = 0; i < self.schema.fields.length; i++) {
            var field_schema = schema.fields[i];
            var field = self.fields[field_schema.name];
            field.initialize();
        }
    };
    
    /* iterate the fields - pass in a function */
    self.iter_fields = function(visitor) {
        for (var i = 0; i < self.schema.fields.length; i++) {
            var field_schema = schema.fields[i];
            var field = self.fields[field_schema.name];
            visitor(field, index);
        }
    };
    
    return self;
};
