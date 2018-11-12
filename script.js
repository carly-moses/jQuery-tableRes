"use strict";
$(document).ready(() => {
  let table = null;

  $(document)
    .on("mouseenter", ".available", (event) => {
      $(event.target).fadeTo(500, 0.5);
    })
    .on("mouseleave", ".available", (event) => {
      $(event.target).fadeTo(500, 1);
    })
    .on("mouseenter", ".reserved", (event) => {
      $(event.target).css("cursor", "not-allowed");
    })
    .on("click", ".available", (event) => {
      $(".reserve-form").fadeIn(1000);
      $(".reserve-form").css("display", "flex");
      table = $(event.target);
      if (event.target.tagName === "P") {
        $(".form-table-num").text(`Table Number: ${table.text()}`); 
      } else {
        $(".form-table-num").text(`Table Number: ${table.children().text()}`);
      }
    })
    .on("click", ".form-x, .form-save", (event) => {
      $(".reserve-form").fadeOut(1000);
      if ($(event.target).hasClass("form-save")) {
        table
          .removeClass("available").addClass("reserved")
          .attr("name", $("input").eq(0).val())
          .attr("phone", $("input").eq(1).val())
          .attr("partysize", $("input").eq(2).val());
        $("input").each(function() {
          $(this).val("");
        });
      }
    })
    .on("mouseenter", ".table", (event) => {
      if ($(event.target).attr("name") && $(event.target).attr("phone")) {
        $(event.target).append(`
        <section class="tooltip">
          <p>Name: ${$(event.target).attr("name")}</p>
          <p>Phone: ${$(event.target).attr("phone")}</p>
          <p>Party Size: ${$(event.target).attr("partysize")}</p>
        </section>
        `);
      }
    });

    $(document).on("mouseleave", ".reserved", (event) => {
      $(".tooltip").remove();
    });
});
