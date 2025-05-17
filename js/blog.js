$(document).ready(function() {
    console.log("Document is klaar en jQuery is geladen.");

    function haalBlogData(callback) {
        console.log("haalBlogData aangeroepen");
        $.ajax({
            url: 'blog-data.html',
            dataType: 'html',
            success: function(data) {
                console.log("Data succesvol opgehaald:", data);
                callback(data);
            },
            error: function(xhr, status, error) {
                console.error("Fout bij ophalen blog data:", xhr, status, error);
                $('#blog-overzicht').html('<p>Fout bij het ophalen van blog data.</p>');
            }
        });
    }

    function verwerkBlogDataOverzicht(data) {
        console.log("verwerkBlogDataOverzicht aangeroepen met data:", data);
        let artikelen = $(data).find('[data-id]');
        console.log("Artikelen gevonden:", artikelen);
        let overzicht = $('#blog-overzicht');
        console.log("Overzicht element:", overzicht);

        artikelen.slice(0, 3).each(function(index) {
            console.log("Verwerken artikel op index:", index);
            let artikelElement = $(this);
            let titel = artikelElement.find('h2').text();
            let auteur = artikelElement.find('.auteur').text();
            let datum = artikelElement.find('.datum').text();
            let samenvatting = artikelElement.text().substring(0, 100) + '...';
            let id = artikelElement.data('id');

            console.log("Artikel details:", { titel, auteur, datum, samenvatting, id });

            overzicht.append(
                '<article>' +
                '<a href="blog_detail.html?id=' + id + '"><h2>' + titel + '</h2></a>' +
                '<p>' + samenvatting + '</p>' +
                '<p>' + auteur + ' - ' + datum + '</p>' +
                '</article>'
            );
             console.log("Artikel toegevoegd aan overzicht:", overzicht);
        });
    }

    function verwerkBlogDataDetail(data, artikelId) {
        console.log("verwerkBlogDataDetail aangeroepen voor artikelId:", artikelId, "met data:", data);
        let artikel = $(data).find('article[data-id="' + artikelId + '"]');
        console.log("Artikel gevonden:", artikel);
        let detail = $('#blog-detail');
        console.log("Detail element:", detail);

        if (artikel.length > 0) {
            let inhoud = artikel.html();
            console.log("Artikel inhoud:", inhoud);
            detail.append('<article>' + inhoud + '</article>');
             console.log("Artikel toegevoegd aan detail:", detail);
        } else {
            detail.html('<p>Artikel niet gevonden.</p>');
        }
    }

    if ($('#blog-overzicht').length > 0) {
        console.log("#blog-overzicht element gevonden. Functie haalBlogData aanroepen");
        haalBlogData(verwerkBlogDataOverzicht);
    }

    if ($('#blog-detail').length > 0) {
        console.log("#blog-detail element gevonden.");
        let urlParams = new URLSearchParams(window.location.search);
        let artikelId = urlParams.get('id');
        console.log("Artikel ID uit URL:", artikelId);
        if (artikelId) {
            haalBlogData(function(data) {
                verwerkBlogDataDetail(data, artikelId);
            });
             console.log("haalBlogData aangeroepen voor detail pagina");
        } else {
            $('#blog-detail').html('<p>Geen artikel geselecteerd.</p>');
        }
    }

    if ($('#blog-form').length > 0) {
        console.log("#blog-form element gevonden. Form validatie instellen");
        $("#blog-form").validate({
            rules: {
                titel: "required",
                auteur: "required",
                inhoud: "required"
            },
            messages: {
                titel: "Vul een titel in",
                auteur: "Vul een auteur in",
                inhoud: "Vul de inhoud in"
            },
            submitHandler: function(form) {
                console.log("Formulier is geldig en wordt ingediend (simulatie).");
                $('#form-melding').text('Blog artikel succesvol ingediend! (niet echt opgeslagen)');
                form.reset();
                $('#form-melding').fadeIn().delay(3000).fadeOut();
            }
        });

        $("#datepicker").datepicker({
            dateFormat: 'dd-mm-yy'
        });
    }

    $('h2').hover(
        function() {
            console.log("Mouseover op h2 element. Animatie start.");
            $(this).animate({ fontSize: '+=5px' }, 200);
        },
        function() {
             console.log("Mouseleave op h2 element. Animatie start.");
            $(this).animate({ fontSize: '-=5px' }, 200);
        }
    );
    console.log("$(document).ready() verwerking voltooid.");
});
