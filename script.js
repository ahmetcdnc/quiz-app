
//Quiz nesnesi oluşturduk. soruları içine verdik.
const quiz = new Quiz(sorular);
//ui.js içinde oluşturduğumuz UI sınıfında sürekli kullandığımız elemanları tanımladık. Burada o sınıftan "ui" nesnesi tanımlayarak istediğimize ulaştık.
const ui = new UI();

//Arttırılmadığı sürece otomatik olarak çağrıldığı zaman 0. indexi yani 1. soruyu getirir.

//------------------------HOCANIN YAPTIĞI----------------------

//------------Oluşturduğumuz butona event ekledik. İlk soru geliyor----------.
ui.btn_start.addEventListener("click", function () {
    //Tıkladığımızda "quiz_box"a "active" classı eklenir. Active classına sahip olanların görünürlük ve tıklanabilirliğini stlye.css içinde geri veriyoruz.  
    ui.quiz_box.classList.add("active");
    //10 saniye boyunca zamanlayıcı çalışacak.(10 parametresi gönderdik).
    startTimer(10);
    startTimerLine();
    //"soruGoster" içine "quiz.soruGetir()" parametresi gönderip soruları gösteriyoruz.soruGoster"quiz.soruGetir()" ve soruGoster functionu içindeki "soru" aynı şey. Biri parametre gönderiyor biri alıyor.// soruGoster fonksiyonunu (UI içinden ui nesnesi ile)çağırarak, quiz nesnesinden bir soruyu göster.
    ui.soruGoster(quiz.soruGetir());
    //ilk parametreyle soruSirasi, ikinci parametreyle toplam soru sayısını gönderdik.(UI içinden ui nesnesi ile)çağırarak
    ui.soruSayisiniGoster(quiz.soruIndex+1,quiz.sorular.length)
    //Sonraki soru butonuna tıkladığımızda "show" sınıfı önce kalkıyor.
    ui.btn_next.classList.remove("show");
    
});

    //----------Sonraki soru butonuna tıkladığımızda sonraki soruya geçiyoruz--------.
   ui.btn_next.addEventListener("click",function(){ 
  // İlk soruyu zaten yukarda getirdik ondan dolayı +1 ekledik.("quiz.soruIndex+1").// Eğer soruların tamamı henüz gösterilmediyse
  if (quiz.sorular.length != quiz.soruIndex+1) {
    //Soruyu getirmeden önce soruIndex'i arttırdık ki aynı soru gelmesin(Start butonuyla ilk soruyu zaten getirdik).
    quiz.soruIndex++;
    //Timer'ı sıfırlıyoruz.
    clearInterval(counter);
    //Timer çizgisini sıfırlıyoruz.
    clearInterval(counterLine);
    //Sonraki soruya geçtiğimizde süre yeniden başlıyor.
    startTimer(10);
    //Sonraki soruya geçtiğimiz süre çizgisini tekrar çağırıyoruz.
    startTimerLine();
    //"soruGoster" içine "quiz.soruGetir()" parametresi gönderip soruları gösteriyoruz.soruGoster"quiz.soruGetir()" ve soruGoster functionu içindeki "soru" aynı şey. Biri parametre gönderiyor biri alıyor.(UI içinden ui nesnesi ile çağır)
    ui.soruGoster(quiz.soruGetir());
     //ilk parametreyle soruSirasi, ikinci parametreyle toplam soru sayısını gönderdik.(UI içinden ui nesnesi ile)çağırarak
     ui.soruSayisiniGoster(quiz.soruIndex+1,quiz.sorular.length)
    //Her yeni soru geldiğinde "show" sınıfnı kaldırıyoruz
    ui.btn_next.classList.remove("show");
   
  }
  //Sorular tamamlanıyor, başka gelmez
  else {
     //Timer'ı sıfırlıyoruz.
     clearInterval(counter);
     //Timer çizgisini sıfırlıyoruz.
    clearInterval(counterLine);
    //Sorular bittiğinde "score_box" active classı ekleyip görünürlük ve tıklanabilirliği açıyoruz.
    ui.score_box.classList.add("active");
    ////Sorular bittiğinde "quiz_box" active classını kaldırıp görünürlük ve tıklanabilirliği kaldırıyoruz.
    ui.quiz_box.classList.remove("active");
    //
    ui.skoruGoster(quiz.sorular.length,quiz.dogruCevapSayisi);

  }
});

 //------QUIT BUTONUNA TIKLANDIĞINDA-------
 ui.btn_quit.addEventListener("click",function(){
  //"quit" butonuna tıkladığımızda sayfayı tekrar yüklüyoruz.
  window.location.reload();
 });

 //-------REPLAY BUTONUNA TIKLANDIĞINDA-------
 ui.btn_replay.addEventListener("click",function(){
  //soru idnexi sıfırlayıp ilk sorudan başlıyoruz ve doğru cevap sayısnı sıfırlıyoruz.
  quiz.soruIndex = 0;
  quiz.dogruCevapSayisi = 0;
  //Replay ettiğimizde tekrar başlatacağımız için "btn_start" ı çalıştırmamız gerekiyor.
  ui.btn_start.click();
  //Açık olan score box'ın "active" classını kadlırıp ekrandan kaldırıyoruz.
  ui.score_box.classList.remove("active");
 })





 //------Bu fonksiyon, kullanıcının seçtiği cevabı kontrol eder ve ardından kullanıcıya doğru veya yanlış olduğunu bildirmek üzere arayüzü günceller---------.
 function optionSelected(option){
  //Bir seçim yaptığımızda süre durdurluyor.
  clearInterval(counter);
  //Seçenek seçtiğimizde timer çizgisini sıfırlıyoruz.
  clearInterval(counterLine);
  //Seçili option(seçenek) içinden span=>b elemanının içinde yazan şıkka ulaştık.
  let cevap = option.querySelector("span b").textContent;
  //Seçili option'ının(index noya göre) sorusunu getirdik.
  let soru = quiz.soruGetir();
  //Verilen cevabıı kontrol ediyoruz
  if(soru.cevabiKontrolEt(cevap)){
    //Doğru cevap sayısını arttırıyoruz.(Quiz içinde başlangıçta 0 olarak tanımladık.)
    quiz.dogruCevapSayisi += 1; 
    //Eğer cevap doğruysa o an seçili option'a "correct" sınıfıı ekleyip yeşil yapıyoruz.
    option.classList.add("correct");
    //bitimden hemen önce correct iconu ekledik
    option.insertAdjacentHTML("beforeend", ui.correctIcon)
  }
  //Eğer cevap doğruysa o an seçili option'a "incorrect" sınıfıı ekleyip kırmızı yapıyoruz.
  else{
    option.classList.add("incorrect");
    //bitimden hemen önce incorrect iconu ekledik
    option.insertAdjacentHTML("beforeend", ui.incorrectIcon)
  }

  //Tek şıkka tıklanabilmesi
  //seçenekler listesinde çocukların(optionlar) sayısına kadar döngü devam eder.
  for(let i = 0; i < ui.option_list.children.length; i++){
    //option_list'in hangi children'ındaysa(i) ona "disabled" classı ekliyoruz."disabled" classını css içinde oluşturuyoruz. *CSS YAZ
    ui.option_list.children[i].classList.add("disabled");

  }

  //Bir seçenek seçiildiğinde sonraki butonuna "show" sınıfı ekleniyor, görünür ve tıklanabilir oluyor.
  ui.btn_next.classList.add("show");

}




//-------ZAMANLAYICI-------

  let counter;
  //"time" parametresi kaç saniyeden başlayacağımızı söylüyor. Start butonuna tıklandığında startTimer çağrılacak "time parametresi gelecek.
  function startTimer(time){
    //setInterval fonksiyonu içerisinde tanımladığımız "timer" fonksiyonunu saniyede bir kez çağıracak. setInterval'ı "counter"a atıyoruz.
    counter = setInterval(timer, 1000);

    function timer(){
      //time değerini yukarda 10 olarak parametre geçtiğimiz için 10dan başlayacak.
      ui.time_second.textContent = time;
      //süreyi bir azaltıyoruz.(her saniye bu fonksiyon çağrıldığı için her saniye süre 1 azalıyor.)
      time--;

      //süre 0'ın altına inerse setInterval'ın temizlenmesi gerekir.
      if(time < 0){
        //süre 0'ın altına indiğinde "clearInterval" metodu içinde sıfırlanmasını istediğimiz intervalı atadığımız değişkeni(counter) veriyoruz. Süre 0'a geldiğinde duruyor.
        clearInterval(counter);
        ui.time_text.textContent = "Süre Bitti"
        //Doğru cevabı "cevap" içinde tutuyoruz.
        let cevap = quiz.soruGetir().dogruCevap
        //For döngüsüyle optionlist içindeki optionlarda dolaşalım. Her option'ın "span" etiketi içindeki "b" elemanı içindeki değerle konttrol edelim. Eğer eşitse o elemanı seçelim ve optionların hepsini disabled yapalım.
        for(option of ui.option_list.children){//tüm optionlar içinde dolanıyoruz
          //O andaki cevabın şıkkını getiriyoruz ve doğru cevaba eşitse
          if(option.querySelector("span b").textContent == cevap){
            //"correct" classı ile özellikleri kazandırıp, icon ekliyoruz
            option.classList.add("correct");
            option.insertAdjacentHTML("beforeend",ui.correctIcon)
          }
          //For döngüsü içinde TÜM elemanların tıklanabilirliğini kaldırıyoruz.
          option.classList.add("disabled");
        }
        //Süre bittikten sonra işaretleme olmadığında sonraki soru butonunun görünür olmasını sağlıyoruz.
        ui.btn_next.classList.add("show")

      }
    }

  }


  //--------SÜRE ANİMASYONU-------

 
  let counterLine;
  function startTimerLine(){
    //Çizginin genişliği 0'dan başlayacak.
    let line_width = 0;
    //timer functionu ve kaç saniyede bir işleyeceği(saniyenin onda biri), setInterval'i counterLine içine atıyoruz
    counterLine = setInterval(timer,100);
    //0'dan başlayacak
    function timer(){
      //Her seferinde 1 artacak
      line_width += 5;
      //Bu eklenen değer her seferinde 1px artarak gelecek.
      ui.time_line.style.width = line_width + "px"
      //çizgi genişliği 549px üzerine çıkarsa 
      if(line_width > 549){
        //çizgiyi durduruyoruz
        clearInterval(counterLine);
      }

    }
    
  }