/// Criado por Janderson Costa em 21/04/2015.
// Dependências: jquery, bootstrap (modal)

function DateTimePicker_Create()
{
	var bootstrapModal =
	'<div class="modal fade" id="dtpicker">\
	<div class="modal-dialog">\
	<div class="modal-content">\
	<div class="modal-body">\
	<div class="dtpicker">\
	<div class="dtpicker-header"><label>01</label>/<label>01</label>/<label>1900</label> <label>00</label>:<label>00</label></div>\
	<table>\
	<tr class="dtpicker-btn-m">\
	<td onclick="DTP_DD(\'more\')">+</td>\
	<td onclick="DTP_DM(\'more\')">+</td>\
	<td onclick="DTP_DY(\'more\')">+</td>\
	<td onclick="DTP_TH(\'more\')">+</td>\
	<td onclick="DTP_TM(\'more\')">+</td>\
	</tr>\
	<tr class="dtpicker-field">\
	<td>01</td>\
	<td>01</td>\
	<td>1900</td>\
	<td>00</td>\
	<td>00</td>\
	</tr>\
	<tr class="dtpicker-btn-l">\
	<td onclick="DTP_DD(\'less\')">-</td>\
	<td onclick="DTP_DM(\'less\')">-</td>\
	<td onclick="DTP_DY(\'less\')">-</td>\
	<td onclick="DTP_TH(\'less\')">-</td>\
	<td onclick="DTP_TM(\'less\')">-</td>\
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
	$("#dtpicker").bind("selectstart", function(){ return false; });
}

function DateTimePicker(field)
{
	var dtpicker = $("#dtpicker");

	if(dtpicker.length > 0)
	{
		field.focus(function()
		{
			DTP_ShowValue($(this).val());

			// Limpar
			dtpicker.find("button").eq(0).unbind("click");
			dtpicker.find("button").eq(0).click(function()
			{
				setTimeout(function()
				{
					field.val("");
					dtpicker.modal("hide");
				}, 200);
			});

			// OK
			dtpicker.find("button").eq(1).unbind("click");
			dtpicker.find("button").eq(1).click(function()
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
		DateTimePicker_Create();
		DateTimePicker(field);
	}
}

function DTP_ShowValue(value)
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
}

function DTP_DD(scope)
{
	var header = $(".dtpicker-header").find("label").eq(0);
	var field = $(".dtpicker-field").find("td").eq(0);
	var v = Number(field.text());

	if(scope == "more")
	{
		if(v == 31)
		{
			v = 1;
		}
		else
		{
			v ++;
		}

		v = (v < 10) ? "0" + v : v;
	}

	if(scope == "less")
	{
		if(v == 1)
		{
			v = 31;
		}
		else
		{
			v --;
		}

		v = (v < 10) ? "0" + v : v;
	}

	header.text(v);
	field.text(v);
}

function DTP_DM(scope)
{
	var header = $(".dtpicker-header").find("label").eq(1);
	var field = $(".dtpicker-field").find("td").eq(1);
	var v = Number(field.text());

	if(scope == "more")
	{
		if(v == 12)
		{
			v = 1;
		}
		else
		{
			v ++;
		}

		v = (v < 10) ? "0" + v : v;
	}

	if(scope == "less")
	{
		if(v == 1)
		{
			v = 12;
		}
		else
		{
			v --;
		}

		v = (v < 10) ? "0" + v : v;
	}

	header.text(v);
	field.text(v);
}

function DTP_DY(scope)
{
	var header = $(".dtpicker-header").find("label").eq(2);
	var field = $(".dtpicker-field").find("td").eq(2);
	var v = Number(field.text());

	if(scope == "more")
	{
		v++;
	}

	if(scope == "less")
	{
		v--;
	}

	header.text(v);
	field.text(v);
}

function DTP_TH(scope)
{
	var header = $(".dtpicker-header").find("label").eq(3);
	var field = $(".dtpicker-field").find("td").eq(3);
	var v = Number(field.text());

	if(scope == "more")
	{
		if(v == 23)
		{
			v = 0;
		}
		else
		{
			v ++;
		}

		v = (v < 10) ? "0" + v : v;
	}

	if(scope == "less")
	{
		if(v == 0)
		{
			v = 23;
		}
		else
		{
			v --;
		}

		v = (v < 10) ? "0" + v : v;
	}

	header.text(v);
	field.text(v);
}

function DTP_TM(scope)
{
	var header = $(".dtpicker-header").find("label").eq(4);
	var field = $(".dtpicker-field").find("td").eq(4);
	var v = Number(field.text());

	if(scope == "more")
	{
		if(v == 59)
		{
			v = 0;
		}
		else
		{
			v ++;
		}

		v = (v < 10) ? "0" + v : v;
	}

	if(scope == "less")
	{
		if(v == 0)
		{
			v = 59;
		}
		else
		{
			v --;
		}

		v = (v < 10) ? "0" + v : v;
	}

	header.text(v);
	field.text(v);
}