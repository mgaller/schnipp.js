/**
 * base class for primitive dynform fields
 *
 * @param {object} field_descriptor field specific part of the form schema
 * @param {object} field_data initial value for the field
 * @constructor
 **/
schnipp.dynforms.primitive_field = function(field_descriptor, field_data) {
    var self = schnipp.dynforms.abstract_field(field_descriptor, field_data)
    self.dom.input = null /* must be set in subclass */

    /**
     * set data of the field
     * used internally by set_data to actually set the field
     * override this instead of set_data to change how the value is set
     * while retaining the event firing implementation
     * @param {?} field data - format depends on the field type
     * @name schnipp.dynforms.primitive_field#_set
     **/
    self._set = function(value) {
        self.dom.input.val(value)
    }

    /**
     * get current field data
     * @returns {?} field data - the format of the data depends on the
     * field type
     * @name schnipp.dynforms.primitive_field#get_data
     **/
    self.get_data = function() {
        return self.dom.input.val()
    }

    /**
     * render the input portion of the field
     *
     * @returns {object} jquery nodelist containing input portion of rendered field view
     *
     * must be implemented by subclass
     *
     * @name schnipp.dynforms.primitive_field#render_input
     **/
    self.render_input = function() {
        return self.dom.input
    }

    /**
     * initialize the field - must be called after the field has been rendered
     * and placed into the DOM of the page.
     * @name schnipp.dynforms.abstract_field#initialize
     **/
    self.initialize = function() {
        self.dom.input.change(function() {
            self.events.fire('changed', {
                src: self,
                value: self.get_data()
            })
        })
    }

    return self
}