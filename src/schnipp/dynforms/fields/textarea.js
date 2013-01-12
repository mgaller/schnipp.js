schnipp.dynforms.fields.textarea = function(field_descriptor, field_data) {
    var self = schnipp.dynforms.fields.text(field_descriptor, field_data);
    
    self.dom.input = $(
        '<textarea name="' + 
        self.field_descriptor.name + 
        '" class="fieldtype_' + self.field_descriptor.type + 
        '">' + self.get_field_data() + 
        '</textarea>'
    );
    
    return self;
};
