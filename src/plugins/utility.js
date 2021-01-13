Number.prototype.pad = function(size) {
  let str = String(this);
  while (str.length < (size || 2)) {
    str = "0" + str;
  }

  return str;
};

Date.prototype.toDateInput = function() {
  const year = this.getFullYear();
  const month = this.getMonth() + 1;
  const date = this.getDate();

  return `${year.pad(4)}-${month.pad(2)}-${date.pad(2)}`;
};

Date.prototype.toTimeInput = function() {
  const hour = this.getHours();
  const minute = this.getMinutes();

  return `${hour.pad(2)}:${minute.pad(2)}`;
};

Date.prototype.toDateTimeInput = function() {
  return `${this.toDateInput()}T${this.toTimeInput()}`;
};
