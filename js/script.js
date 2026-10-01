const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");
if(menuBtn) menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));

const mainFilters = document.querySelectorAll(".main-filter");
const subFilters = document.querySelectorAll(".sub-filter");
const subGroups = document.querySelectorAll(".sub-filter-group");
const cards = document.querySelectorAll(".portfolio-card");

let currentCategory = "all";
let currentSubcategory = "all";

function showSubgroup(category){
  subGroups.forEach(group => {
    group.classList.toggle("active", group.dataset.parent === category);
  });
}

function filterPortfolio(){
  cards.forEach(card => {
    const categoryMatch = currentCategory === "all" || card.dataset.category === currentCategory;
    const subcategoryMatch = currentSubcategory === "all" || card.dataset.subcategory === currentSubcategory;
    card.classList.toggle("hidden", !(categoryMatch && subcategoryMatch));
  });
}

mainFilters.forEach(filter => {
  filter.addEventListener("click", () => {
    mainFilters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");

    currentCategory = filter.dataset.filter;
    currentSubcategory = "all";

    subFilters.forEach(f => f.classList.remove("active"));
    const group = document.querySelector(`.sub-filter-group[data-parent="${currentCategory}"]`);
    if (group) {
      const first = group.querySelector(".sub-filter");
      if (first) first.classList.add("active");
    }

    showSubgroup(currentCategory);
    filterPortfolio();
  });
});

subFilters.forEach(filter => {
  filter.addEventListener("click", () => {
    subFilters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");
    currentSubcategory = filter.dataset.subfilter;
    filterPortfolio();
  });
});

showSubgroup("all");
filterPortfolio();

const form=document.querySelector(".contact-form");
if(form){
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const name=form.querySelector("[name=name]").value.trim();
    const email=form.querySelector("[name=email]").value.trim();
    const message=form.querySelector("[name=message]").value.trim();
    if(!name||!email||!message){alert("Please complete all required fields.");return;}
    const subject=encodeURIComponent("Project enquiry from "+name);
    const body=encodeURIComponent(message+"\n\nName: "+name+"\nEmail: "+email);
    window.location.href=`mailto:hello@boldframeanimation.com?subject=${subject}&body=${body}`;
  });
}
