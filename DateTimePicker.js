// Criado por Janderson Costa em 21/04/2015.
// Dependências: jquery, bootstrap (modal)
// Utilização: DateTimePicker.field($("input"));

var DateTimePicker =
{
	field: function(field)
	{
		var _this = this;
		var dtpicker = $("#2ab3a0741fge00f6bc75");

		if(dtpicker.length > 0)
		{
			field.focus(function()
			{
				_this.setValue($(this).val());

				// Limpar
				var Limpar = dtpicker.find("button").eq(0);
				Limpar.unbind("click");
				Limpar.click(function()
				{
					setTimeout(function()
					{
						field.val("");
						dtpicker.modal("hide");
					}, 200);
				});

				// OK
				var OK = dtpicker.find("button").eq(1);
				OK.unbind("click");
				OK.click(function()
				{
					setTimeout(function()
					{
						field.val($(".dtpicker-header").text());
						dtpicker.modal("hide");
					}, 200);
				});

				dtpicker.modal("show");
				$(this).blur();
			});
		}
		else
		{
			this.create();
			this.field(field);
		}
	},
	create: function()
	{
		var bootstrapModal =
		'<div class="modal fade" id="2ab3a0741fge00f6bc75">\
		<div class="modal-dialog">\
		<div class="modal-content">\
		<div class="modal-body">\
		<div class="dtpicker">\
		<div class="dtpicker-header"><label>01</label>/<label>01</label>/<label>1900</label> <label>00</label>:<label>00</label></div>\
		<table>\
		<tr class="dtpicker-btn">\
		<td onclick="DateTimePicker.day(\'more\')">+</td>\
		<td onclick="DateTimePicker.month(\'more\')">+</td>\
		<td onclick="DateTimePicker.year(\'more\')">+</td>\
		<td onclick="DateTimePicker.hour(\'more\')">+</td>\
		<td onclick="DateTimePicker.minute(\'more\')">+</td>\
		</tr>\
		<tr class="dtpicker-field">\
		<td>01</td>\
		<td>01</td>\
		<td>1900</td>\
		<td>00</td>\
		<td>00</td>\
		</tr>\
		<tr class="dtpicker-btn">\
		<td onclick="DateTimePicker.day(\'less\')">-</td>\
		<td onclick="DateTimePicker.month(\'less\')">-</td>\
		<td onclick="DateTimePicker.year(\'less\')">-</td>\
		<td onclick="DateTimePicker.hour(\'less\')">-</td>\
		<td onclick="DateTimePicker.minute(\'less\')">-</td>\
		</tr>\
		</table>\
		</div>\
		</div>\
		<div class="modal-footer">\
		<button type="button" class="btn btn-default">Limpar</button>\
		<button type="button" class="btn btn-default">OK</button>\
		</div>\
		</div>\
		</div>\
		</div>';

		$("body").append(bootstrapModal);
		$("#2ab3a0741fge00f6bc75").bind("selectstart", function(){ return false; });
	},
	setValue: function(value)
	{
		var dd, dm, dy, th, tm;

		if(value.length > 0)
		{
			// data e horario do campo
			dd = Number(value.split(" ")[0].split("/")[0]);
			dm = Number(value.split(" ")[0].split("/")[1]);
			dy = Number(value.split(" ")[0].split("/")[2]);
			th = Number(value.split(" ")[1].split(":")[0]);
			tm = Number(value.split(" ")[1].split(":")[1]);
		}
		else
		{
			// data e horario corrente
			var date = new Date();
			dd = date.getDate();
			dm = date.getMonth() + 1;
			dy = date.getFullYear();
			th = date.getHours();
			tm = date.getMinutes();
		}

		dd = (dd < 10) ? "0" + dd : dd;
		dm = (dm < 10) ? "0" + dm : dm;
		th = (th < 10) ? "0" + th : th;
		tm = (tm < 10) ? "0" + tm : tm;

		// valor topo
		var header = $(".dtpicker-header").find("label");
		header.eq(0).text(dd);
		header.eq(1).text(dm);
		header.eq(2).text(dy);
		header.eq(3).text(th);
		header.eq(4).text(tm);

		// valor centro
		var field = $(".dtpicker-field").find("td");
		field.eq(0).text(dd);
		field.eq(1).text(dm);
		field.eq(2).text(dy);
		field.eq(3).text(th);
		field.eq(4).text(tm);
	},
	day: function(param)
	{
		var header = $(".dtpicker-header").find("label").eq(0);
		var field = $(".dtpicker-field").find("td").eq(0);
		var v = Number(field.text());

		if(param)
		{
			if(param === "more")
			{
				if(v == this.monthDays()[this.month() - 1])
				{
					v = 1;
				}
				else
				{
					v++;
				}
			}
			else if(param === "less")
			{
				if(v == 1)
				{
					v = this.monthDays()[this.month() - 1];
				}
				else
				{
					v--;
				}
			}
			else
			{
				v = param;
			}

			v = (v < 10) ? "0" + v : v;

			header.text(v);
			field.text(v);
		}
		else
		{
			return v;
		}
	},
	month: function(param)
	{
		var header = $(".dtpicker-header").find("label").eq(1);
		var field = $(".dtpicker-field").find("td").eq(1);
		var v = Number(field.text());

		if(param)
		{
			if(param === "more")
			{
				if(v == 12)
				{
					v = 1;
				}
				else
				{
					v++;
				}
			}
			else if(param === "less")
			{
				if(v == 1)
				{
					v = 12;
				}
				else
				{
					v--;
				}
			}
			else
			{
				v = param;
			}

			v = (v < 10) ? "0" + v : v;

			header.text(v);
			field.text(v);	

			// corrige o último dia permitido para o mês selecionado
			var days = this.monthDays()[v - 1];

			if(this.day() > days)
			{
				this.day(days);
			}
		}
		else
		{
			return v;
		}
	},
	year: function(param)
	{
		var header = $(".dtpicker-header").find("label").eq(2);
		var field = $(".dtpicker-field").find("td").eq(2);
		var v = Number(field.text());

		if(param)
		{
			if(param === "more")
			{
				v++;
			}
			else if(param === "less")
			{
				v--;
			}
			else
			{
				v = param;
			}

			header.text(v);
			field.text(v);

			// corrige o último dia permitido para o mês selecionado
			var days = this.monthDays()[this.month() - 1];

			if(this.day() > days)
			{
				this.day(days);
			}
		}
		else
		{
			return v;
		}
	},
	hour: function(param)
	{
		var header = $(".dtpicker-header").find("label").eq(3);
		var field = $(".dtpicker-field").find("td").eq(3);
		var v = Number(field.text());

		if(param)
		{
			if(param === "more")
			{
				if(v == 23)
				{
					v = 0;
				}
				else
				{
					v++;
				}
			}
			else if(param === "less")
			{
				if(v == 0)
				{
					v = 23;
				}
				else
				{
					v--;
				}
			}
			else
			{
				v = param;
			}

			v = (v < 10) ? "0" + v : v;

			header.text(v);
			field.text(v);
		}
		else
		{
			return v;
		}
	},
	minute: function(param)
	{
		var header = $(".dtpicker-header").find("label").eq(4);
		var field = $(".dtpicker-field").find("td").eq(4);
		var v = Number(field.text());

		if(param)
		{
			if(param === "more")
			{
				if(v == 59)
				{
					v = 0;
				}
				else
				{
					v++;
				}
			}
			else if(param === "less")
			{
				if(v == 0)
				{
					v = 59;
				}
				else
				{
					v--;
				}
			}
			else
			{
				v = param;
			}

			v = (v < 10) ? "0" + v : v;

			header.text(v);
			field.text(v);
		}
		else
		{
			return v;
		}
	},
	monthDays: function()
	{
		var febDays = (this.year() % 1900 % 4) == 0 ? 29 : 28;// ano bisexto
		return [31, febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	}
};
