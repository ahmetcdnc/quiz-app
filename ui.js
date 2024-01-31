//ÇOK YERDE ÇAĞIRDIĞIMIZ ELEMANLAR İÇİN KISALTMALAR
function UI(){
    //Sık kullandığımız elemanları burada tanımlıyoruz. Sonrasında hangi js içinde kullanacaksak orada "UI"dan nesne türetip onun aracılığıyla kullanıyoruz.
    this.btn_start = document.querySelector(".btn-start"),
    this.btn_next = document.querySelector(".next_btn"),
    this.quiz_box = document.querySelector(".quiz_box"),
    this.score_box = document.querySelector(".score_box"),
    this.btn_replay = document.querySelector(".btn_replay"),
    this.btn_quit = document.querySelector(".btn_quit"),
    this.time_text = document.querySelector(".time_text"),
    this.time_second = document.querySelector(".time_second"),
    this.time_line = document.querySelector(".time_line")

    //Seçenekler listesini "option_list" içine aldık.
    this.option_list = document.querySelector(".option_list"),
    //Doğru ve yanlış cevaplarda çıkacak ikonlar
    this.correctIcon ='<div class="icon"><i class="fas fa-check"></i></div>',
    this.incorrectIcon ='<div class="icon"><i class="fas fa-times"></i></div>'
}

//-------SORULARI GÖSTER-------
UI.prototype.soruGoster =function(soru) {
  //Soruyu oluşturduk.
  let question = `<span>${soru.soruMetni}</span>`;
  //Başlangıçta cevaplar kısmını boş oluşturduk, dinamik bir şekilde aşağıda veriyoruz.
  let options = "";
  // Her "cevap" bilgisi "a,b,c..." bilgisi yani key, [] içinde cevap dediğimizde ise onun value'sünü almış oluyoruz.
  for (cevap in soru.cevapSecenekleri) {
    //Her seçenek için sorunun cevap seçenekleri içinde "cevap" ile dinamik olarak gezdik. "${cevap} şıkkı", "${soru.cevapSecenekleri[cevap]} ise o şıkkın karşılığındaki cevabı getiriyor".
    options += `
           <div class="option">
           <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
           </div>
           `;
  }
  //Soruyu html kısmına dinamik olarak ekledik.
  document.querySelector(".question-text").innerHTML = question;
  //Seçenekleri html kısmına " option_list" kullanarak dinamik olarak ekledik.(ui içinde tanımlandığı için "this")
  this.option_list.innerHTML = options;
  

  //Tüm option bilgilerine ulaşıyorum.(ui içinde tanımlandığı için "this")
  const option = this.option_list.querySelectorAll(".option");
  //optionlar arasında tek tek dolaşıyoruz
  for(let opt of option){
    //Her option bilgisine, "setAttribute" metodu aracılığıyla "optionSelected" functionu ile bir event ekliyoruz. "this" bilgisi göndererek ulaşmış olduğumuz optionu gönderiyoruz.
    opt.setAttribute("onclick", "optionSelected(this)")
  }

}

//-------SORU SAYISINI GÖSTER-------
//Soru Sayısını gösteriyoruz. Soru sayısını butona ilk tıklamada ve next butonuna tıkladığımızda göstereceğimiz için bu butonların click eventlerinde "soruSayisiniGoster" functionu çağırıp parametre gönderiyoruz.
UI.prototype.soruSayisiniGoster = function(soruSirası, toplamSoru){
  //Kaçıncı soruda olduğumuz ve toplam sorus sayısını dinamik olarak yazdırmak için "tag" oluşturduk
  let tag = `<span class="badge bg-warning">${soruSirası} / ${toplamSoru}</span>`;
  //tag eşitliğin sağında..?
  document.querySelector(".quiz_box .question_index").innerHTML = tag;

}

//--------SKORU GÖSTER-------
UI.prototype.skoruGoster = function(toplamSoru, dogruCevap){
  //Dinamik olarak  soru sayısı ve doğru cevap sayısını oluşturuyoruz.
  let tag =`Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz.`;
  //Html içine, oluşturduğumuz değeri yazdırıyoruz.
  document.querySelector(".score_box .score_text").innerHTML = tag;

}